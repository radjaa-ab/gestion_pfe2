//import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  defenseRoom: z.string().min(1, { message: "Please select a defense room." }),
  pfeChoice: z.string().min(1, { message: "Please enter your PFE choice." }),
  emailTemplate: z.string().min(10, { message: "Email template must be at least 10 characters." }),
  pfeTheme: z.string().min(1, { message: "Please select a PFE theme." }),
  themeOption: z.string().min(1, { message: "Please enter a theme option." }),
})

const defenseRooms = ["Room A", "Room B", "Room C", "Room D"]
const pfeThemes = ["Web Development", "Mobile App Development", "AI/Machine Learning", "Data Science", "Cybersecurity"]

export function PfeSelectionForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      defenseRoom: "",
      pfeChoice: "",
      emailTemplate: "",
      pfeTheme: "",
      themeOption: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "PFE Selection Submitted",
      description: "Your PFE selection has been successfully submitted.",
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="defenseRoom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Defense Room</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a defense room" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {defenseRooms.map((room) => (
                    <SelectItem key={room} value={room}>{room}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the room for your PFE defense.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pfeChoice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PFE Choice</FormLabel>
              <FormControl>
                <Input placeholder="Enter your PFE choice" {...field} />
              </FormControl>
              <FormDescription>
                Enter the title or brief description of your chosen PFE.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailTemplate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Template</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter your email template here" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide an email template for communication regarding your PFE.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pfeTheme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PFE Theme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a PFE theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pfeThemes.map((theme) => (
                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the main theme of your PFE.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="themeOption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme Option</FormLabel>
              <FormControl>
                <Input placeholder="Enter theme option" {...field} />
              </FormControl>
              <FormDescription>
                Specify any additional theme options or sub-themes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit PFE Selection</Button>
      </form>
    </Form>
  )
}

