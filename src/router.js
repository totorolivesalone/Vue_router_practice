import {createRouter, createWebHistory} from 'vue-router'
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router=createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/',redirect:'/teams'},
        { path: '/teams', name:'teams',
            meta:{needsAuth:true},
            components:{ default: TeamsList , footer:TeamsFooter}, children:[
            { path: ':teamId',name:'team-members',component:TeamMembers, props:true}, //teams/t1

        ]}, 
        { path: '/users',name:'users',components:{default:UsersList, footer: UsersFooter},
        beforeEnter(_, _2, next){
            console.log("Users beforeEnter")
            next();

        }},
        {path:'/:notFound(.*)', component:NotFound}



    ],
    linkActiveClass:'active',
    scrollBehavior(_,_2, savedPosition){
        if(savedPosition)
        {
            return savedPosition;
        }
        //console.log(to,from, savedPosition )
        return {left:0 , top:0};

    }
});
router.beforeEach(function (to, from , next){
    console.log('Global beforeEach');
    console.log(to,from);
    if(to.meta.needsAuth){
        console.log("Needs Auth!");
        next();
    }
    else{
        next();
    }
    
})

export default router;