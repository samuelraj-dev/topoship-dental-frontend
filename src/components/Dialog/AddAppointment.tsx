import { useRef } from 'react';
import { z } from "zod"
// import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
// import { cn } from "@/lib/utils"

import { Plus } from "lucide-react"
// import { CalendarIcon } from "lucide-react"

// shadcn ui
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription  } from '@/components/ui/dialog';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"

import AddPatientDialog from "./AddPatient"

// form
import { useForm } from "react-hook-form";
import { editAppointmentSchema } from "@/utils/validator";

import { useRecoilState, useSetRecoilState } from "recoil";
import { appointmentsState } from "@/state/atoms"
import { patientsState } from '@/state/atoms';

const DialogForm = () => {

  const { toast } = useToast()
  const setAppointments = useSetRecoilState(appointmentsState);
  // @ts-ignore
  const [ patients, setPatients ] = useRecoilState(patientsState)
  const submitDialogFormRef = useRef(null);

  const form = useForm<z.infer<typeof editAppointmentSchema>>({
    resolver: zodResolver(editAppointmentSchema),
  })

  // Handling Dialog Form on Submit
  async function onSubmit (data: z.infer<typeof editAppointmentSchema>) {

    // updating button text to "Adding..."
    const element: any = submitDialogFormRef.current;
    if (element) {
      element.innerText = 'Adding...';
      element.disabled = true;
    }

    try {
      // updating database
      await fetch("https://api.topoship.com/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      
      // updating table
      const getPatientsResponse = await fetch("https://api.topoship.com/appointments");
      setAppointments(await getPatientsResponse.json())

      // updating button text to "done"
      element.innerText = 'Done';

      // informing user
      toast({
        description: `Added the details of ${data.patId}`,
      })

      // closing dialog
      document.getElementById('closeDialog')?.click();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-end">
          <div className="grid gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            <AddPatientDialog />

            {/* App ID */}
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Appointment ID:</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Appointment ID..." className="col-span-3" {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            ></FormField>

            {/* Pat ID */}
            {/* <FormField
              control={form.control}
              name="patId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Patient ID:</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Patient ID..." className="col-span-3" {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            ></FormField> */}

            {/* Pat ID */}
            <FormField
              control={form.control}
              name="patId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient:</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={`w-[150px]`}>
                        <SelectValue placeholder="Select Patient..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Patient</SelectLabel>
                          <ScrollArea className="h-[200px]">
                            {patients && patients.map(patient => (
                              // @ts-ignore
                              <SelectItem key={patient.PatID} value={patient.PatID}>{patient.PatName}</SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Doctor */}
            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Doctor..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Date..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // @ts-ignore
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            /> */}

            {/* Time */}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Time..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Visit Purpose */}
            <FormField
              control={form.control}
              name="visitPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visit Purpose:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Visit Purpose..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

          </div>
          
          <Button ref={submitDialogFormRef} type="submit">Save Changes</Button>

        </form>
      </Form>
    </>
  )
}

export default function AddAppointmentDialog() {
  return (
    <Dialog>

      <DialogTrigger asChild>              
        <Button
          variant="outline"
          size="sm"
          className="px-[0.4rem] ml-[0.2rem]"
        >
          <Plus height="15px" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Appointment</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <DialogForm />
        
      </DialogContent>

    </Dialog>
  )
}