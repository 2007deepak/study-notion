import React from 'react'

function Dashboard() {


    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} = useSelector((state) => state.profile);  
    
    if((profileLoading || authLoading)){

        {/* show loader */ }
        return <div className='mt-10'>
            Loading...
        </div>
    }
  return (
    <div>
      
    </div>
  )
}

export default Dashboard
