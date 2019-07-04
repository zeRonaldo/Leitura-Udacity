export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function toDateReadable(date)
{
   let result="";
   let posted = new Date(date);
   let now = new Date();
   let timeDiff = (now - posted)/(1000*60*60) ;

   if(timeDiff < 24){
     if(timeDiff<1){
       timeDiff = Math.round(timeDiff*60)
       if(timeDiff === 1){
         return "a minute ago"
       }
       return timeDiff + " minutes ago"
     }else{
      timeDiff = Math.round(timeDiff)
       if(timeDiff===1){
        return "a Hour ago"
       }
       return timeDiff + " Hours ago"
     }
   }else{
     timeDiff= Math.round(timeDiff/24)
     if(timeDiff === 1){
       return "Yesterday"
     }else if(timeDiff<=7){
       return timeDiff + " Days ago"
     }else if(timeDiff<30){
       timeDiff = (timeDiff/7)
       return timeDiff + " Weeks ago"
     }else if(timeDiff === 30){
       return timeDiff/30 + " Month ago"
     }
     let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
     result = `${posted.getDate()}-${months[posted.getMonth()]}-${posted.getFullYear()}`
     return result;
   }

   
}

export function hashCode(){
  return Date.now().toString(36)+ Math.random().toString(36).substr(2, 9);              
}

export function isEmpty (obj) {
  if(Object.entries(obj).length > 0){
    return false;
  }
  return true;
}