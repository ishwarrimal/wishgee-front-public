export default function(product){
    let retVal = {}
    switch(product){
        case 'laptop':
            retVal = {
                max: 200000,
                left: 40000,
                right: 80000,
                step: 5000,
                multiplier: 2.5,
            }
            break;
        case 'earphones':
            retVal = {
                max: 20000,
                left: 2000,
                right: 4000,
                step: 500,
                multiplier: 2.5,
            }
            break;
        case 'speaker':
            retVal = {
                max: 40000,
                left: 4000,
                right: 8000,
                step: 500,
                multiplier: 1.25,
            }
            break;
        case 'watch':
            retVal = {
                max:20000,
                left: 2000,
                right: 6000,
                step:500,
                multiplier: 2.5,
            }
            break;
        default:
            retVal = {
                max: 100000,
                left: 10000,
                right: 30000,
                step: 1000,
                multiplier: 1,
            }
            break;
    }
    return retVal
}

//multiplier = step*100/max