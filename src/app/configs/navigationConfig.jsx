import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StyledIcon from '@/components/wrappers/StyledIcon';


export const navigationConfig = [
  {
    label: <StyledIcon icon={FavoriteBorderOutlinedIcon} />,
    text:"Wishlist",
    path: '/wishlist',
    component: 'WishList',
    render:true
  },
  {
    label: <StyledIcon icon={ShoppingCartOutlinedIcon} />,
    text:"Cart",
    path: '/cart',
    component: 'Cart',
    render:true
  },
  {
    label: "Orders",
    text:"Orders",
    path: '/orders',
    component: 'Orders',
    render:false
  },
  {
    label: "Home",
    text:"Home",
    path: '/',
    component: 'Home',
    render:false
  },
  {
    label: "Login Signup",
    text:"Login Signup",
    path: '/login-signup',
    component: 'LoginSignup',
    render:false
  },
  {
    label:"About Us",
    text:"About Us",
    path: '/about-us',
    component: 'AboutUs',
    render:false
  },
  {
    label: "Contact Us",
    text:"Contact Us",
    path: "contact",
    component: 'ContactUs',
    render:false
  },
  {
    label: "Term Condition",
    text:"Term Condition",
    path: "termcondition",
    component: 'TermCondition',
    render:false
  },
  {
    label: "Privacy Policy",
    text:"Privacy Policy",
    path: "privacypolicy",
    component: 'PrivacyPolicy',
    render:false
  },
  {
    label: "Return Refund",
    text:"Return and Refund Policy",
    path: "returnrefund",
    component: 'ReturnRefund',
    render:false
  },
  {
    label: "Shipping Policy",
    text: "Shipping Policy",
    path: "shippingpolicy",
    component: 'ShippingPolicy',
    render:false
  },
  {
    label: "Cancellation Policy",
    text: "Cancellation Policy",
    path: "cancellationpolicy",
    component: 'CancellationPolicy',
    render:false
  }









  
  
];