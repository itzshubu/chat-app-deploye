import React, { useEffect, useState } from 'react'
import Search from './search'
import User   from './users'
import Logout from './logout'
import Usegetallusers from '../../context/Usegetallusers'

const left = () => {
  
    let [usersdata , loading] =  Usegetallusers()
 

  const [searchword , setsearchword] = useState("") 
 
  usersdata.sort((a,b)=>{
    const aStartsWith = a.fullname.toLowerCase().startsWith(searchword.toLowerCase())
    const bStartsWith = b.fullname.toLowerCase().startsWith(searchword.toLowerCase())
     
    if(aStartsWith && !bStartsWith){
          return -1
    } else if(!aStartsWith && bStartsWith){
           return 1
    } else {
      return 0
    }
  })

  return (
    <div className='bg-black w-full sm:w-[30%] text-white'>
     <Search value={{searchword , setsearchword}}/>
     <User usersdata={usersdata}/>
     <Logout/>
    </div>
  )
}

export default left