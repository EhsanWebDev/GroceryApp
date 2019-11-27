import {URL} from '../../utls'
import axios from 'axios'
export function catagoriesList(){

    const request= axios.get(`${URL}api/CategoriesApi/ListCategories`)
                            .then(res=>res.data.categories).catch((e)=>console.log(e))

    return{
        type:'CATEGORIES_LIST',
        payload: request
    }
}
 
export function subcategoriesList(id){
    const request= axios.get(`${URL}api/ProductsApi/ShowSubcategories/?id=`+id)
                            .then(res=>res.data).catch((e)=>console.log(e))

      return{
          type:'SUBCATEGORIES_LIST',
          payload:request
      }                      
}

export function productsList(id){
    const request= axios.get(`${URL}api/ProductsApi/ShowProduct/?id=`+id) 
                            .then(res=>res.data).catch((e)=>console.log(e))

      return{
          type:'PRODUCTS_LIST',
          payload:request
      }                      
}
export function allProductsList(){
    const request= axios.get(`${URL}api/OrdersApi/ProductsBuyUsers`)
    .then(res=>res.data).catch((e)=>console.log(e))

return{
type:'ALL_PRODUCTS',
payload:request
}   
}
export function addToCart(product){
    return{
        type:'ADD_TO_CART',
        payload:product
    } 
}

export function removeFromCart(product){
    return{
        type:'REMOVE_FROM_CART',
        payload:product
    }
}

export function empty(){
    return{
        type:'EMPTY',
        payload:null,
    }
}

export function placeOrder(data){
 const req=   axios({
        url:`${URL}api/OrdersApi/Create`,
        method:'POST',
        data:JSON.stringify({
         UID:data.userID,
         Product_ID:data.products_id,
         Quantity:data.quantities,
         TotalQuantity:data.total_quantity,
         OrderStatus:data.orderStatus,
         CUSTOMER:data.customer,
         CONTACT:data.mobile,
         STREETADDRESS:data.street_address,
         city_id:6,
         Amount:data.total_price,
         AmountAfterDiscount:data.amountAfterDiscount,
         TotalShippingCharges:data.totalShippingCharges,
         CreatedAt:data.CreatedAt,
         UpdatedAt:data.UpdatedAt,
         STORE_ID:data.store_id
     }),
     headers: {
         "Content-type": "application/json; charset=UTF-8"
       }
    }).then(res=>res.data).catch(e=>console.log(e)) 

    return{
        type:'PLACE_ORDER',
        payload:req
    }
}
export function userAddressAct(data){
    const myData={};
    myData.name = data.name
    myData.mobile = data.mobile
    myData.address=data.address

    return{
        type:'ORDER_ADDRESS',
        payload:myData
    }
}

export function getOrders(id){
        const req = axios.get(`${URL}api/OrdersApi/OrderInformation?id=`+id)
        .then(res=>res.data).catch((e)=>{
            console.log(e)
        })

        return{
            type:'GET_ORDERS',
            payload:req
        }
}


export function signUp(data){

        const req=  axios( {
            url:`${URL}api/UsersApi/Create`,
            method: 'POST',
            data: JSON.stringify({
                NAME:data.username,
                EMAIL:data.email,
                PASSWORD:data.password,
                CONTACT:data.mobile,
                USERTYPE:1,
                CREATED_AT:data.created

            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then((res)=>res).catch((e)=>console.log(e))


        return{
            type:'SIGN_UP',
            payload: req
        }
}

export function signIn(data){

   const req=  axios({
        url:`${URL}api/LoginApi/Create`,
        method: 'POST',
        data: JSON.stringify({
            NAME:data.username,
            PASSWORD:data.password,
            CREATED_AT:data.created,
            UPDATED_AT:data.updated
            
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response =>response.data).catch((e)=>console.log(e))
    
    return{
        type:'SIGN_IN',
        payload:req
    }
}
export function logOut(){
    return{
      type:'SIGN_OUT',
      payload:null,
    }
  }

export function updateUser(data){

    const req=  axios( {
        url:`${URL}api/UsersApi/UpdateUser`,
        method: 'POST',
        data: JSON.stringify({
            ID:data.id,
            NAME:data.name,
            EMAIL:data.email,
            PASSWORD:data.password,
            CONTACT:data.mobileNumber,
            USERTYPE:1,
            CREATED_AT:data.created,
            UPDATED_AT:data.updated
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((res)=>res).catch((e)=>console.log(e))


    return{
        type:'UPDATE_USER',
        payload: req
    }
}



export function autoSignIn(id){

    
      const req = axios.get(`${URL}api/UsersApi/FindUser/?id=`+id)
      .then(response =>response.data).catch((e)=>console.log(e))

      return{
          type:'AUTO_SIGN_IN',
          payload:req
      }

    }
