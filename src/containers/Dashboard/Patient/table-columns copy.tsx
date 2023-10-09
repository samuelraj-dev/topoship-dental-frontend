import { useState } from "react";

// types
import { dbPatient } from "./types";

// shadcn ui
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DialogForm } from "./table-form"


export const columns: ColumnDef<dbPatient>[] = [
  // select
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) => {
            table.toggleAllPageRowsSelected(!!value)
          }}
        />
      )
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => {
            row.toggleSelected(!!value)
          }}
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  // ID
  {
    accessorKey: "PatID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc")
          }}
        >
          Patient ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  // Name
  {
    accessorKey: "PatName",
    header: "Name"
  },
  // Age
  {
    accessorKey: "patAge",
    header: "Age"
  },
  // Gender
  {
    accessorKey: "patGender",
    header: "Gender"
  },
  // Mobile
  {
    accessorKey: "PatMobile",
    header: "Mobile"
  },
  // City
  {
    accessorKey: "City",
    header: "City"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patientDetails = row.original
      const [selectedAction, setSelectedAction] = useState('');

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* Edit Trigger */}
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setSelectedAction('edit')}>                 
                    Edit
                </DropdownMenuItem>
              </DialogTrigger>

              {/* Delete Trigger */}
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setSelectedAction('delete')}>                 
                    <span className="text-[#dc2626] hover:text-[#dc2626]">Delete</span>
                </DropdownMenuItem>
              </DialogTrigger>

            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Edit Dialog */}
          {selectedAction === 'edit' && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Patient</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <DialogForm patientDetails={patientDetails} />            
            </DialogContent>
          )}

          {/* Delete Dialog */}
          {selectedAction === 'delete' && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Patient</DialogTitle>
                <DialogDescription>Are you sure you want to delete this patient?</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogTrigger>
                  <Button variant="ghost">Cancel</Button>
                </DialogTrigger>
                <Button variant="destructive">Delete</Button>
              </DialogFooter>            
            </DialogContent>
          )}

        </Dialog>
      )
    }
  }
]











































































































































































// import { Patient } from "@/types/Patient"

// import { ColumnDef, Visibility } from "@tanstack/react-table"

// // Imports for Shadcn
// import { Checkbox } from "@/components/ui/checkbox"

// // Imports for Icons
// import { ArrowUpDown } from "lucide-react"

// export const columns: ColumnDef<Patient>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={table.getIsAllPageRowsSelected()}
//         onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value: any) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           ID
//         </div>
//       )
//     },
//     accessorKey: 'id'
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Name
//         </div>
//       )
//     },
//     accessorKey: "name",
//     cell: ({ row }) => <div style={{ textTransform: 'capitalize' }}>{row.getValue("name")}</div>,
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Age
//         </div>
//       )
//     },
//     accessorKey: 'age'
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Gender
//         </div>
//       )
//     },
//     accessorKey: 'gender'
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Mobile
//         </div>
//       )
//     },
//     accessorKey: 'mobile'
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           City
//         </div>
//       )
//     },
//     accessorKey: 'city'
//   },
// ]