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
  const { user: contextUser, setUser } = useAuth();
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
    console.log('Submitting data:', data);

    try {
      const response = await api.post('/login', data);
      console.log('Login response:', response.data);

      let responseData = response.data;

      // Check if the response is a string (possibly containing JSON)
      if (typeof responseData === 'string') {
        try {
          // Remove any comments or unexpected content before the JSON
          const jsonStartIndex = responseData.indexOf('{');
          if (jsonStartIndex !== -1) {
            responseData = responseData.substring(jsonStartIndex);
          }
          // Attempt to parse the string as JSON
          responseData = JSON.parse(responseData);
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          throw new Error("Login failed: Unable to parse response.");
        }
      }

      if (responseData.status === 'success' && responseData.user) {
        handleSuccessfulLogin(responseData);
      } else {
        throw new Error("Login failed: Unexpected response format.");
      }
    } catch (error: any) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = (data: any) => {
    const { access_token, user } = data;
    if (!user.role) {
      throw new Error("Login failed: User role not found in response.");
    }
    localStorage.setItem('token', access_token);
    setUser(user);
    toast({
      title: 'Connexion réussie',
      description: 'Bienvenue sur la plateforme PFE!',
      variant: 'default',
    });
    navigate(`/${user.role}`);
  };

  const handleLoginError = (error: any) => {
    console.error('Login error:', error);
    let errorMessage = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
    if (error.response) {
      console.error('Error response:', error.response);
      if (error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        if (validationErrors && typeof validationErrors === 'object') {
          errorMessage = Object.entries(validationErrors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('\n');
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      } else {
        errorMessage = error.response.data.message || 'Erreur du serveur. Veuillez réessayer plus tard.';
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    toast({
      title: 'Échec de la connexion',
      description: errorMessage,
      variant: 'destructive',
    });
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
                      Email <EnvelopeIcon className="ml-2 h-4 w-4 inline" />
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
                      Mot de passe <LockClosedIcon className="ml-2 h-4 w-4 inline" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Entrez votre mot de passe"
                          {...field}
                          className="pl-10"
                          autoComplete="current-password"
                        />
                        <LockClosedIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Button
                          type="button"
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
          <Link to="/register" className="text-sm text-blue-600 hover:underline">Créer un compte</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

