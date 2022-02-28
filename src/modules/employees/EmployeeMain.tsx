import React, { FC, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { deleteEmployee, getEmployees, postEmployee } from '../../services/employees.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { IEmployees } from './Employee.interface'
import EmployeeForm from './EmployeeForm'
import { useModal } from '../../hooks/useModal'


const EmployeeMain: FC = (): JSX.Element => {

    const [employees, setEmployees] = useState<Array<IEmployees>>([])
    const [employeeSelected, setEmployeeSelected] = useState<string>("")
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [action, setAction] = useState<string>("")

    const [employeesFiltered, setEmployeesFiltered] = useState<Array<IEmployees>>([])
    const [search, setSearch] = useState<string>("")

    const [page, setPage] = useState<number>(0)
    const [empPerPage, setEmpPerPage] = useState(10)

    useEffect(() => {
        getEmployees()
            .then(rpta => {
                setEmployees(rpta)
                setEmployeesFiltered(rpta)
            })
    }
        , [])

    const refreshData = () => {
        getEmployees()
            .then(rpta => {
                setEmployees(rpta)
                setEmployeesFiltered(rpta)
            })
    }

    const openCreateModal = () => {
        setEmployeeSelected("")
        setAction("create");
        openModal()
    }

    const openUpdateModal = (id: string) => {
        setEmployeeSelected(id)
        setAction("update");
        openModal()
    }

    const actionEraseEmployee = (id: string) => {
        deleteEmployee(id)
            .then(rpta => {
                refreshData()
                return true
            }
            )
    }

    const preDeleteEmployee = (emp: Partial<IEmployees>) => {
        Swal.fire({
            title: `¿Quieres Borrar al Empleado ${emp.primerNombre} ${emp.primerApellido}?`,
            text: "No podras revertir el procedimiento",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
                actionEraseEmployee(emp.id as string)
                Swal.fire(
                    'Eliminado!',
                    'El registro fue eliminado',
                    'success'
                )
            }
        })
    }

    const addPage = () => {
        if (page < Math.floor(employeesFiltered.length / empPerPage))
            setPage(page + 1)
    }
    const reducePage = () => {
        if (page > 0)
            setPage(page - 1)
    }

    const handleSearch = (e: any) => {
        const { value } = e.target;
        setSearch(value);
    }

    const searchWord = () => {
        let er = new RegExp(search, 'i')
        const filter = employees.filter(emp=>{
            if(er.test(emp.primerNombre)) return emp
            else if(er.test(emp.primerApellido)) return emp
            else if(er.test(emp.segundoApellido)) return emp
            else if(er.test(emp.pais)) return emp
        })
        if(filter.length>0){            
            setEmployeesFiltered(filter)
            setPage(0)
        }
    }

    return (
        <>
            <div className="row my-3">
                <h1 className="mt-4">Empleados</h1>
            </div>
            <div className="row justify-content-between mb-1">
                <div className="col-3">
                    <button className='btn btn-success' onClick={openCreateModal}>Nuevo Empleado</button>
                </div>
                <div className="col-3">
                    <div className="input-group">
                        <input type="text"
                            className='form-control'
                            placeholder="Busqueda"
                            value={search}
                            onChange={handleSearch} />
                        <div className="input-group-prepend" style={{ cursor: 'pointer' }} onClick={searchWord}>
                            <span className="input-group-text" id="validationTooltipUsernamePrepend">
                                <FontAwesomeIcon style={{ color: "gray", margin: `4px`, cursor: 'pointer' }}
                                    icon={faMagnifyingGlass}></FontAwesomeIcon>
                            </span>
                        </div>
                    </div>


                </div>
            </div>
            <div className="row">

                <EmployeeForm isOpen={isOpenModal} closeModal={closeModal} refreshData={refreshData} action={action} idEmployee={employeeSelected}>
                </EmployeeForm>

            </div>
            <table className="table table-hover">
                <thead className="table-info">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Primer Nombre</th>
                        <th scope="col">Primer Apellido</th>
                        <th scope="col text-center">Correo Electronico</th>
                        <th scope="col">Fecha Ingreso</th>
                        <th scope="col">Fecha Creacion</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesFiltered.slice(page * empPerPage, page * empPerPage + empPerPage).map((emp, index) => {
                        return (
                            <tr key={emp.id}>
                                <th scope="row">{++index + (page * empPerPage)}</th>
                                <td>{emp.primerNombre}</td>
                                <td>{emp.primerApellido}</td>
                                <td>{emp.correo}</td>
                                <td>{emp.fechaIngreso}</td>
                                <td>{emp.fechaCreacion}</td>
                                <td>
                                    <FontAwesomeIcon style={{ color: "orange", marginRight: `6px`, cursor: 'pointer' }}
                                        icon={faEdit}
                                        onClick={() => openUpdateModal(emp.id)}></FontAwesomeIcon>
                                    <FontAwesomeIcon style={{ color: "red", cursor: 'pointer' }}
                                        icon={faTrashCan}
                                        onClick={() => preDeleteEmployee(emp)}></FontAwesomeIcon>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="row justify-content-between">
                <div className="col">
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" onClick={reducePage}>Anterior</a></li>
                            <li className="page-item"><a className="page-link" >{page + 1}</a></li>
                            <li className="page-item"><a className="page-link" onClick={addPage}>Siguiente</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="col-2">
                    Total de Paginas : {Math.ceil(employeesFiltered.length/empPerPage)}
                </div>
            </div>
        </>
    )
}

export default EmployeeMain