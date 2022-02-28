import { message } from "../../constants/message.validations";
import { IEmployees } from "./Employee.interface";

export const validationEmployee = (emp: IEmployees) => {
    const errorValidation: any = {}

    if (emp.primerApellido === "")
        errorValidation.primerApellido = message.notEmpty
    else if (!/^[A-Z|\s]{3,20}$/.test(emp.primerApellido as string))
        errorValidation.primerApellido = "Solo mayusculas, de 3 hasta 20 caracteres, sin Ñ ni tildes"

    if (emp.segundoApellido === "")
        errorValidation.segundoApellido = message.notEmpty
    else if (!/^[A-Z|\s]{3,20}$/.test(emp.segundoApellido as string))
        errorValidation.segundoApellido = "Solo mayusculas, de 3 hasta 20 caracteres, sin Ñ ni tildes"

    if (emp.primerNombre === "")
        errorValidation.primerNombre = message.notEmpty
    else if (!/^[A-Z]{3,20}$/.test(emp.primerNombre as string))
        errorValidation.primerNombre = "Solo mayusculas, de 3 hasta 20 caracteres, sin Ñ ni tildes"

    if (!/^[A-Z|\s]{0,20}$/.test(emp.otrosNombres as string))
        errorValidation.otrosNombres = "Solo mayusculas, hasta 50 caracteres, sin Ñ ni tildes"

    if (emp.pais === "")
        errorValidation.pais = message.notSelected

    if (emp.tIdentificacion === "")
        errorValidation.tIdentificacion = message.notSelected

    if (emp.nIdentificacion === "")
        errorValidation.nIdentificacion = message.notEmpty
    else if (!/^[a-zA-Z0-9]{8,20}$/.test(emp.nIdentificacion as string))
        errorValidation.nIdentificacion = "Debe ingresar de 8 hasta 20 caracteres"

    if (emp.area === "")
        errorValidation.area = message.notSelected

    if (emp.fechaIngreso === "")
        errorValidation.fechaIngreso = message.notSelected

    return errorValidation
}