export const fadeUp = (delay:number) => ({
    initial:{
        opacity:0 ,
        y :40
    },  
    whileInView:{
        opacity: 1 ,
        y:0
    } ,
    viewport:{
        once :false ,
        amount: 0.2,

    } ,
    transition:{
        duration: 0.6 ,
        delay:delay ,
    }
})