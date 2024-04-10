import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
    providers:[
        GitHubProvider({
            profile(profile){
                console.log("Profile GitHub: " , profile)

                let userRole = "GitHub User"
                if (profile?.email == "izunduchukwuemika9@gmail.com"){
                    userRole = "admin"
                }
                return{
                    ...profile,
                    role: userRole,
                }
            },
            clientId : process.env.GITHUB_ID,
            clientSecret : process.env.GITHUB_Secret,
        }),

        //  

        GoogleProvider({
            profile(profile){
                // u can remove the console.log logic below
                console.log("Profile Google: " , profile)
                return{
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                }
            },
            clientId : process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_Secret,

        }),
    ],
    callbacks:{
        async jwt({token, user}){
            if(user) token.role = user.role;
        },
        async session({session, token}){
            if(session.user)session.user.role =token.role;
            return session;
        }
    }
}