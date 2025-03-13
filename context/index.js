import { createContext, useContext, useMemo, useReducer } from "react";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
const MyContext = createContext() 

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {...state, userLogin: action.value}
            break;
        case "LOGOUT":
            return{...state, userLogin: null}
            break;
        default:
            throw new Error(`${action.type} không tồn tại`);
    }
}

const MyContextControllerProvider = ({children}) => {
    const initialStates = {
        userLogin: null,
        shoppingCart: []
    }

    const [controller, dispatch] = useReducer(reducer,initialStates);
    const value = useMemo (()=>[controller,dispatch],[controller,dispatch])

    return (
        <MyContext.Provider value={value}>  
            {children}  
        </MyContext.Provider>
    )
}
/// use context (Store)

const useMyContextController = () =>{
    const context = useContext(MyContext);
    if (!context) {
        throw new Error
        (
            "useMyContextController su dung trong MyContextController"
        )
    }
    return context
}


 // khai bao cac collection
  const cUSERS = firestore().collection("USERS")
  const cSERVICES = firestore().collection("SEVICES")


  //action

  const login = (dispatch, email, password) =>{
    //Su dung auth de xac thuc là 1 promise nen co then cacth . Hoạc su dung asign await
    auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
            //Thuc thuc thanh cong lay thong tin user tu firestore voi key la email
            cUSERS.doc(email)
            .onSnapshot((doc) =>{
                //Cap nhat tthog tin userLogin len store
                dispatch({type:"USER_LOGIN",value: doc.data()})
                console.log("Login sussess!")
            })
           
    })
    .catch(e => console.log(e))
  }

  const logout = (dispatch) =>{
    //userLogin = null
    auth().signOut()
    .then(() => dispatch({type:"LOGOUT"}))
  }
// dinh nghia
  export {
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
  }