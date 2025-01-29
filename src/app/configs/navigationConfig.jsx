import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StyledIcon from '@/components/wrappers/StyledIcon';


export const navigationConfig = [
  {
    label: "Home",
    path: '/',
    component: 'Home',
    render:false
  },
  {
    label: <StyledIcon icon={ShoppingCartOutlinedIcon} />,
    path: '/cart',
    component: 'Cart',
    render:true
  },
  {
    label: <StyledIcon icon={FavoriteBorderOutlinedIcon} />,
    path: '/wishlist',
    component: 'WishList',
    render:true
  },
  {
    label: "Orders",
    path: '/orders',
    component: 'Orders',
    render:false
  },
  {
    label: "Track Orders",
    path: '/track-orders',
    component: 'TrackOrders',
    render:false
  },
  {
    label: "Login Signup",
    path: '/login-signup',
    component: 'LoginSignup',
    render:false
  },
  {
    label: "Items",
    path: '/product-category',
    component: 'Items',
    render:false
  },
  {
    label: "Product",
    path: '/product',
    component: 'Product',
    render:false
  },
  {
    label: "User Contact",
    path: "usercontact",
    component: 'UserContact',
    render:false
  },
  {
    label: "Contact Us",
    path: "contact",
    component: 'ContactUs',
    render:false
  },
  {
    label: "Term Condition",
    path: "termcondition",
    component: 'TermCondition',
    render:false
  },
  {
    label: "Privacy Policy",
    path: "privacypolicy",
    component: 'PrivacyPolicy',
    render:false
  },
  {
    label: "Return Refund",
    path: "returnrefund",
    component: 'ReturnRefund',
    render:false
  },
  {
    label: "Shipping Policy",
    path: "shippingpolicy",
    component: 'ShippingPolicy',
    render:false
  },
  {
    label: "Cancellation Policy",
    path: "cancellationpolicy",
    component: 'CancellationPolicy',
    render:false
  },{
    label: "About Us",
    path: "aboutus",
    component: 'AboutUs',
    render:false
  }
  
  
];