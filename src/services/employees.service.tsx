import { IEmployees } from "../modules/employees/Employee.interface"

let urlEmployees = "http://localhost:8000/employees"

export const getEmployees = async () => {
    const response = await fetch(urlEmployees)
    const data = response.json()
    return data
}

export const getEmployee = async (id:string) =>{
    const response = await fetch(`${urlEmployees}/${id}`)
    const data = response.json()
    return data
}

export const postEmployee = async (inputData:Partial<IEmployees>) =>{
    const response = await fetch(urlEmployees, {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers:{
            'Content-Type': 'application/json'
          }
    })
    const data = response.json()
    return data
}

export const updateEmployee = async (id:string, inputData:Partial<IEmployees>) =>{
    const response = await fetch(`${urlEmployees}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(inputData),
        headers:{
            'Content-Type': 'application/json'
          }
    })
    const data = response.json()
    return data
}

export const deleteEmployee = async (id:string)=>{
    const response = await fetch(`${urlEmployees}/${id}`,{
        method: 'DELETE'
    })
    const data = response.json()
    return data
}