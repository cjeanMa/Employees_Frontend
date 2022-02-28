import React, { FC, ReactNode, useEffect, useState } from 'react'
import moment from 'moment'
import pseudoData from '../../constants/constants'
import { getEmployee, postEmployee, updateEmployee } from '../../services/employees.service'
import { IEmployees } from './Employee.interface'
import { validationEmployee } from './Employees.validations';

import './Employee.css'

interface IEmployeeForm {
    children: ReactNode | Element,
    isOpen: boolean,
    closeModal: () => void,
    refreshData: () => void,
    action: string,
    idEmployee: string
}

const EmployeeForm: FC<IEmployeeForm> = ({ children, isOpen, closeModal, refreshData, action, idEmployee }): JSX.Element => {


    const [employee, setEmployee] = useState<Partial<IEmployees>>({
        primerApellido: "",
        segundoApellido: "",
        primerNombre: "",
        otrosNombres: "",
        pais: "",
        tIdentificacion: "",
        nIdentificacion: "",
        area: "",
        fechaIngreso: moment(new Date).format("YYYY-MM-DD")
    })
    const [errors, setErrors] = useState<any>({})

    useEffect(() => {
        if (action === "update" && idEmployee !== "") {
            getEmployee(idEmployee)
                .then(rpta => {
                    const { id, estado, correo, fechaCreacion, fechaActualizacion, fechaIngreso, ...dEmployee } = rpta
                    const fIngreso = moment(fechaIngreso).format("YYYY-MM-DD")
                    setEmployee({ ...dEmployee, fechaIngreso: fIngreso })
                })
        }
        else{
            refreshEmployee()
        }
    }, [idEmployee])

    const refreshEmployee = () => {
        setEmployee({
            primerApellido: "",
            segundoApellido: "",
            primerNombre: "",
            otrosNombres: "",
            pais: "",
            tIdentificacion: "",
            nIdentificacion: "",
            area: "",
            fechaIngreso: moment(new Date).format("YYYY-MM-DD")
        })
    }

    const saveEmployee = (dataEmployee: Partial<IEmployees>) => {
        postEmployee(dataEmployee)
            .then(rpta => refreshData())
    }

    const modifyEmployee = (id: string, dataEmployee: Partial<IEmployees>) => {
        updateEmployee(id, dataEmployee)
            .then(rpta => refreshData())
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const validations = validationEmployee(employee as IEmployees)
        if (action === "create") {
            if (Object.keys(validations).length > 0)
                setErrors(validations)
            else {
                saveEmployee(employee)
                setErrors({})
                refreshEmployee()
                closeModal()
            }
        }
        else
            if (Object.keys(validations).length > 0)
                setErrors(validations)
            else {
                modifyEmployee(idEmployee, employee)
                setErrors({})
                closeModal()
            }
    }

    const handleInputEmployee = (e: any) => {
        const { id, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [id]: value
        }));
    }

    const clickLimpiar = (e:any) =>{
        e.preventDefault()
        refreshEmployee()
    }

    const preventSubmitCancel = (e: any) => {
        e.preventDefault()
        setErrors({})
        closeModal()
    }


    return (
        <>
            <article className={`modal ${isOpen && "is-open"}`}>
                <div className="modal-container">
                    <button className="modal-close" onClick={preventSubmitCancel}> X
                    </button>
                    <div className="card p-3">

                        <h3>{(action === "create") ? "Nuevo Empleado" : "Actualizar Empleado"}</h3>
                        <div className="card-body">
                            <form className="py-2"
                                onSubmit={handleSubmit}>
                                <div className="row gy-3">
                                    <div className="col-6">
                                        <label htmlFor="primerApellido">Primer Apellido:</label>
                                        <input id="primerApellido"
                                            type="text"
                                            className='form-control'
                                            placeholder="Primer Apellido"
                                            value={employee.primerApellido}
                                            onChange={handleInputEmployee}></input>
                                        <span className='feed-error'>
                                            {errors.primerApellido ? errors.primerApellido : ""}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="segundoApellido">Segundo Apellido:</label>
                                        <input id="segundoApellido"
                                            type="text"
                                            className='form-control'
                                            placeholder="Segundo Apellido"
                                            value={employee.segundoApellido}
                                            onChange={handleInputEmployee}></input>
                                        <span className='feed-error'>
                                            {errors.segundoApellido ? errors.segundoApellido : ""}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="primerNombre">Primer Nombre:</label>
                                        <input id="primerNombre"
                                            type="text"
                                            className='form-control'
                                            placeholder="Primer Nombre"
                                            value={employee.primerNombre}
                                            onChange={handleInputEmployee}></input>
                                        <span className='feed-error'>
                                            {errors.primerNombre ? errors.primerNombre : ""}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="otrosNombre">Otros Nombres:<span style={{ color: "green", fontSize: `10px` }}>(Opcional)</span></label>
                                        <input id="otrosNombres"
                                            type="text"
                                            className='form-control'
                                            placeholder="Otros Nombres"
                                            value={employee.otrosNombres}
                                            onChange={handleInputEmployee}></input>
                                        <span className='feed-error'>
                                            {errors.otrosNombres ? errors.otrosNombres : ""}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="pais">Pais:</label>
                                        <select id="pais"
                                            className='form-control'
                                            value={employee.pais}
                                            onChange={handleInputEmployee}>
                                            <option value="">--Select--</option>
                                            {pseudoData.paises.map(pais => {
                                                return (
                                                    <option key={pais} value={pais}>{pais}</option>

                                                )
                                            })}
                                        </select>
                                        <span className='feed-error'>
                                            {errors.pais ? errors.pais : ""}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="tIdentificacion">Tipo de Identificación:</label>
                                        <select id="tIdentificacion"
                                            className='form-control'
                                            value={employee.tIdentificacion}
                                            onChange={handleInputEmployee}>
                                            <option value="">--Select--</option>
                                            {pseudoData.identificaciones.map(ident => {
                                                return (
                                                    <option key={ident} value={ident}>{ident}</option>
                                                )
                                            })}
                                        </select>
                                        <span className='feed-error'>
                                            {errors.tIdentificacion ? errors.tIdentificacion : ""}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="nIdentificacion">Nº de Identificación:</label>
                                        <input id='nIdentificacion'
                                            type="text"
                                            className='form-control'
                                            placeholder="Primer Nombre"
                                            value={employee.nIdentificacion}
                                            onChange={handleInputEmployee}></input>
                                        <span className='feed-error'>
                                            {errors.nIdentificacion ? errors.nIdentificacion : ""}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="area">Area:</label>
                                        <select id="area"
                                            className='form-control'
                                            value={employee.area}
                                            onChange={handleInputEmployee}>
                                            <option value="">--Select--</option>
                                            {pseudoData.area.map(area => {
                                                return (
                                                    <option key={area} value={area}>{area}</option>
                                                )
                                            })}
                                        </select>
                                        <span className='feed-error'>
                                            {errors.area ? errors.area : ""}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="fechaIngreso">Fecha de Ingreso:</label>
                                        <input className='form-control'
                                            type="date"
                                            id="fechaIngreso"
                                            min={moment(employee.fechaIngreso).subtract(29,'days').format('YYYY-MM-DD')}
                                            max={employee.fechaIngreso}
                                            value={employee.fechaIngreso}
                                            onChange={handleInputEmployee}>
                                        </input>
                                        <span className='feed-error'>
                                            {errors.fechaIngreso ? errors.fechaIngreso : ""}
                                        </span>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-3 align-self-end">
                                        <button type="submit" className="btn btn-success">Guardar</button>
                                    </div>
                                    <div className="col-3 align-self-end">
                                        <button className="btn btn-danger" onClick={preventSubmitCancel}> Cancelar </button>
                                    </div>
                                    {(action==="create")?
                                    <div className="col-3 align-self-end">
                                        <button className="btn btn-primary" onClick={clickLimpiar}> Limpiar</button>
                                    </div>:""
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    {children}
                </div>
            </article>
        </>
    )
}

export default EmployeeForm