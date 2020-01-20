import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
export class AuthProvider{
    
    readonly GRAPHQL_URL= 'https://trntable-twitch.herokuapp.com/v1/graphql';
    httpLink: any;
    client: any;
    token: string;

    constructor(Twitch: any){
        // listen for token updates from twitch extension helper
        this.setupAuthListener(Twitch);

        // initalize apollo client
        this.httpLink = createHttpLink({
            uri: this.GRAPHQL_URL
        });
        var link = this.getAuthOptions(this.token).concat(this.httpLink);
        this.client = new ApolloClient({
            link: link,
            cache: new InMemoryCache()
        })
    }
    private setupAuthListener(Twitch: any){
        Twitch.ext.onAuthorized(data => {
            this.token = data.token;
        })
    }
    getAuthOptions(token?: string){
        return setContext((_, { headers }) => {
            // return the headers to the context so httpLink can read them
            return {
              headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
              }
            }
          });
    }

    getClient(){
        return this.client
    }

    resetAuth(token){
        console.log(token)
        this.client.resetStore().then(()=> {
            this.client.link = this.getAuthOptions(token).concat(this.httpLink);
        })
        
    }
}