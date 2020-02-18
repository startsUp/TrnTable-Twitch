const SubscriberRoles = {}
const FollowerRoles = {}
const ViewerRoles = {}
const BroadcasterRoles = {}
export enum Role{
    SUBSCRIBER = 1,
    FOLLOWER,
    VIEWER,
    BROADCASTER
}

export const getRole = (roleDesc: string) => {
    switch (roleDesc) {
        case 'broadcaster':
            return Role.BROADCASTER
        case 'moderator':
            return Role.BROADCASTER
        case 'viewer':
            return Role.VIEWER
        case 'external':
            return Role.VIEWER
        default:
            return Role.VIEWER
    }
}