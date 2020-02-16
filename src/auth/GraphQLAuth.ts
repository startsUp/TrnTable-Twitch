import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { useState, createContext } from 'react';
export class GraphQLAuth{
    
    readonly GRAPHQL_URL= 'https://trntable-twitch.herokuapp.com/v1/graphql';
    httpLink: any;
    client: any;
    token: string;

    constructor(token: any){
        this.token = token 
        if (token) localStorage.setItem('token', token)
        
        // initalize apollo client
        this.httpLink = createHttpLink({
            uri: this.GRAPHQL_URL
        });
        var link = this.getAuthOptions().concat(this.httpLink);
        this.client = new ApolloClient({
            link: link,
            cache: new InMemoryCache()
        })
    }

    getAuthOptions(){
        return setContext((_, { headers }) => {
            // return the headers to the context so httpLink can read them
            const token = localStorage.getItem('token');
            return {
              headers: {
                ...headers,
                authorization: token ? `${token}` : "",
              }
            }
        });
    }

    getClient(){
        return this.client
    }

    resetAuthWithToken(token: string) {
        this.setToken(token)
        this.resetAuth()
    }

    setToken(token: string){
        this.token = token
        localStorage.setItem('token', token)
    }

    resetAuth(){
        this.client.resetStore().then(()=> {
            this.client.link = this.getAuthOptions().concat(this.httpLink);
        })
        
    }
}