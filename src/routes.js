import Body from './pages/Landing/Body.js'
import Adminloginpage from './pages/Login/Admin/Adminloginpage.js'
import Customerloginpage from './pages/Login/Customer/Customerloginpage.js'
import Dealerloginpage from './pages/Login/Dealer/Dealerloginpage.js'
import Dealeraccountpage from './component4/Dealeraccountpage.js'
import Venuecarddetailpage from './pages/Carddetailpage/Venuecarddetailpage.js'
import Dealerregistrationpage from './pages/Register/Dealer/Dealerregistrationpage.js'
import Customerregistrationpage from './pages/Register/Customer/Customerregistrationpage.js'
import Explorevenue from './component4/Explorevenue.js'

export const routes = [
    {
        path: "/",
        component: <Body/>
    },
    {
        path:"/explorevenue",
        component: <Explorevenue/>
   },
    {
        path:"/adminlogin",
        component: <Adminloginpage/>
    },
    {
        path:"/customerlogin",
        component: <Customerloginpage/>
    },
    {
        path:"/dealerregistration",
        component: <Dealerregistrationpage/>
    }
    ,{
        path :"/dealerlogin",
        component: <Dealerloginpage/>
    },{
        path:"/customerregistration",
        component:<Customerregistrationpage/>
    },
    {
        path: "/dealeraccount/:id",
        component: <Dealeraccountpage/>
    },{
        path:"/forcustomer/venue/:id",
        component: <Venuecarddetailpage/>
    }
];