import { create } from 'zustand'
import { ILogin,ILoginResponse,IPasswordSet } from '../types';
import { api } from '../api';

interface ILoginStore {
  isLoading:boolean,
  error:boolean,
  success:boolean,
  errorData:string | null,
  successMsg:string |null,
  isToken: boolean,
  login: (data: ILogin) =>Promise<ILoginResponse | undefined>, 

  setIsToken: (value: boolean) => void
}
interface IForgotStore {
  isLoading:boolean,
  error:boolean,
  success:boolean,
  errorData:string | null,
  successMsg:string |null,
  resetPassword:(email:string) => void,
 
}
interface IResetStore {
  isLoading:boolean,
  error:boolean,
  success:boolean,
  errorData:string | null,
  successMsg:string |null,
  setPassword:(data:IPasswordSet) => void,
 
}
    

export const useLoginStore = create<ILoginStore>()((set) => ({
  isLoading:false,
  error: false,
  errorData: null,
  success: false,
  successMsg:null,
  isToken: false,
  login: async (data:ILogin)=>{
    set({ isLoading: true, success:false, error:false, successMsg:null })
    try {
        const res =  await api.logIn(data);
        set({  success: true, isLoading: false});
        return res;
    } catch (error: any) {
        set({  isLoading: false ,error: true, errorData: error.message });

    }
  },
  
  setPassword: async (data:IPasswordSet)=>{
    set({ isLoading: true, success:false, error:false, successMsg:null })

    try {
     await api.setPassword(data)
      set({ success:true})
     } catch (error:any) {
       set({  isLoading: false ,error: true, errorData: error.message });
 
     }
  },
  setIsToken: (value: boolean) => set({ isToken: value }),

 
}))
export const useForgotStore = create<IForgotStore>()((set) => ({
  isLoading:false,
  error: false,
  errorData: null,
  success: false,
  successMsg:null,
 
  resetPassword: async(email: string)=>{
    set({ isLoading: true, success:false, error:false, successMsg:null })
  
    try {
     const resp =  await api.resetPassword(email)
     set({ successMsg: resp , success:true})
 
   
     
    } catch (error:any) {
      set({  isLoading: false ,error: true, errorData: error.message });

    }

  },
  

 
}))
export const useResetPassStore = create<IResetStore>()((set) => ({
  isLoading:false,
  error: false,
  errorData: null,
  success: false,
  successMsg:null,
  setPassword: async (data:IPasswordSet)=>{
    set({ isLoading: true, success:false, error:false, successMsg:null })

    try {
     await api.setPassword(data)
      set({ success:true})
     } catch (error:any) {
       set({  isLoading: false ,error: true, errorData: error.message });
 
     }
  },
  

 
}))