import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Loader2 } from 'lucide-react';
import api from '../services/api';


const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères.",
  }),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login: contextLogin, user: contextUser, setUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await api.post('/login', data);
      const { access_token, user } = response.data;

      if (!user) {
        throw new Error("Login failed: User data not found in response.");
      }

      if (!user.role) {
        throw new Error("Login failed: User role not found in response.");
      }


      localStorage.setItem('token', access_token);
      setUser(user); // Set user in context
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue sur la plateforme PFE!',
        variant: 'default',
      });
      navigate(`/${user.role}`);

    } catch (error: any) { // Use type any to catch all error types
      console.error('Login error:', error);

      let errorMessage = 'Veuillez vérifier vos identifiants et réessayer.';
      if (error.message === "Login failed: User data not found in response." || error.message === "Login failed: User role not found in response.") {
        errorMessage = error.message; // Display specific error message
      } else if (error.response) {
        errorMessage = error.response.data.message || 'Server error. Please try again later.'; // Use server-provided message if available
      }

      toast({
        title: 'Échec de la connexion',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contextUser) {
      navigate(`/${contextUser.role}`);
    }
  }, [contextUser, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
    <Card className="w-full max-w-md mx-4">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <EnvelopeIcon className="ml-2 h-4 w-4" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                  <FormLabel>
                    Mot de passe <LockClosedIcon className="ml-2 h-4 w-4" />
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockClosedIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Entrez votre mot de passe"
                        {...field}
                        className="pl-10"
                        autoComplete="current-password"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0 w-auto h-auto"
                      >
                        {showPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-500"/> : <EyeIcon className="w-5 h-5 text-gray-500"/>}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Link to="/register">Créer un compte</Link>
      </CardFooter>
    </Card>
    </div>
  );
};

export default Login;

