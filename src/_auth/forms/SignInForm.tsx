import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SigninValidation } from '../../lib/validation/index.ts';
import { Input } from "@/components/ui/input";
import Loader from '@/components/shared/Loader';
import { createUserAccount } from '@/lib/appwrite/api'
 
import { Button } from '../../components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useForm } from 'react-hook-form';   
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations.ts';
import { useUserContext } from '@/context/AuthContext.tsx';


//  SIGNUP FORM


const SignInForm = () => {
  
  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext()
  const navigate = useNavigate();
  const {mutateAsync: signInAccount} = useSignInAccount()

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  //ON SUBMIT
  
  async function onSubmit(values: z.infer<typeof SigninValidation>) {

    const session = await signInAccount({ 
      email: values.email,
      password: values.password
    });

    if(!session) {
      return toast({title: "Sign In Failed. Plesae try again."})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset()

      navigate('/')
    } else {
      return toast({title: 'SIGN UP FAILED. PLEASE TRY AGAIN. '})
    }

      
  }
    
    
    return (
      <Form {...form}>
  
        <div className="sm:w-420 flex-center flex-col">
  
          <img src="/assets/images/logo.svg" alt="logo" />
  
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Login To Your Existing Account
          </h2>
  
          <p className="text-light-3 small-medium md:base-regular mt-2">
            Welcome back to snapgram, please enter your details
          </p>
  
        
  
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4 ">
  
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EMAIL</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PASSWORD</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {isUserLoading ? (
                <div className="flex flex-centre gap-2">
                  <Loader />Loading...
                </div>
              ) : "LOGIN"}
            </Button>
  
                <p className="text-small-regular text-light-2 text-center mt-2">
                  DO NOT HAVE AN ACCOUNT? 
                  <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign-up</Link>
                </p>
  
          </form>
        </div>
      </Form>
    )
  }

export default SignInForm;