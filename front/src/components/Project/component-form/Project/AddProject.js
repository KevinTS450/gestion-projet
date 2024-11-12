import React from "react";
import { useState, useEffect } from "react";
import { Button, Select } from "antd";
import { DatePicker } from 'antd';
import { Checkbox } from 'antd';
import { projectService } from "../../service/project.service";
import { Loader } from "../../../utils/spiner/spiner";
import dayjs from 'dayjs';
import moment from "moment";
import { serviceConfig } from "../../../../config/Service.config";

function AddProject(props) {

    const dateFormat = 'YYYY/MM/DD';

    useEffect(() => {

        getProject()

    }, [])

    const getProject = async () => {

        if (props.idProject) {

            await projectService.getProject(props.idProject).then((res) => {

                setNom(res.data.nom)
                setDescription(res.data.description)
                setDate_debut(serviceConfig.formatDateToUs(res.data.date_de_debut))
                setDate_fin(serviceConfig.formatDateToUs(res.data.date_de_fin_prevue))
                setBudget(res.data.budget)
                setPriorite(res.data.priorite)
                setObjectif(res.data.objectifs)
            })

        }
    }


    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")
    const [date_debut, setDate_debut] = useState("")
    const [date_fin, setDate_fin] = useState("")
    const [budget, setBudget] = useState("")
    const [priorite, setPriorite] = useState("")
    const [objectif, setObjectif] = useState("")
    const [is_active, setIsActive] = useState("")

    const [loading, setLoading] = useState(false)


    const options = [
        {
            label: 'haute',
            value: 'haute',
        },
        {
            label: 'moyenne',
            value: 'moyenne',
        },
        {
            label: 'basse',
            value: 'basse',
        },

    ];

    const [formErros, setFormErros] = useState({
        nom: "",
        description: "",
        date_debut: "",
        date_fin: "",
        budget: "",
        priorite: "",
        objectif: ""
    })


    const getAttr = (e) => {

        const { name, value } = e.target

        if (name == 'nom') {
            setNom(value)

        } else if (name == 'description') {

            setDescription(value)
        }
        else if (name == 'budget') {

            setBudget(value)

        } else if (name == 'objectif') {

            setObjectif(value)
        }


    }

    const getDateDebut = (date, dateString) => {

        setDate_debut(dateString)

    }

    const getDateFin = (date, dateString) => {

        setDate_fin(dateString)

    }

    const getSelectedValue = (value) => {

        setPriorite(value)
    }

    const onChangeCheck = (e) => {

        setIsActive(e.target.checked)
    }


    const validationErrors = (nom, description, date_debut, date_fin, budget, priorite, objectif) => {

        const erros = {}

        let isValid = true

        if (!nom) {

            isValid = false
            erros.nom = 'veuillez saisir le nom du projet'
        }

        if (!description) {
            isValid = false

            erros.description = 'veuillez saisir la description du projet'
        }
        if (!date_debut) {
            isValid = false

            erros.date_debut = 'veuillez saisir la date de debut du projet'

        } if (!date_fin) {
            isValid = false

            erros.date_fin = 'veuillez saisir la date de fin  du projet'
        }
        if (!budget) {
            isValid = false

            erros.budget = 'veuillez saisir le budget  du projet'
        }
        if (!priorite) {
            isValid = false

            erros.priorite = 'veuillez saisir la priorite  du projet'
        }
        if (!objectif) {
            isValid = false

            erros.objectif = "veuillez saisir l'objectif du projet"
        }

        return isValid ? null : erros
    }

    const dataSeting = () => {

        const data = {

            nom: nom,
            description: description,
            date_de_debut: date_debut,
            date_de_fin_prevue: date_fin,
            priorite: priorite,
            budget: budget,
            objectifs: objectif,
            is_active: is_active


        }

        return data

    }

    const ajoutProjet = async () => {
        setLoading(true)

        const validateErrors = validationErrors(nom, description, date_debut, date_fin, budget, priorite, objectif)

        if (validateErrors) {

            setTimeout(() => {
                setLoading(false)
                setFormErros(validateErrors)

            }, 1000)

            return

        }

        const data = dataSeting()
        const res = await projectService.createProject(data, props.idProject ? props.idProject : null)
        console.log(res)
        if (res.data) {

            setTimeout(() => {
                setLoading(false)

            }, 1000)

            const dataToSend = {
                message: props.idProject ? "le projet a etait modifier" : "le projet a etait ajouté" ,
                change: true,
                type: 'success'
            }
            props.addProject(dataToSend)
        }

    }






    return (
        <>

            <div className="bg-gray-100">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-9">
                            <div className="bg-white flex flex-col gap-2 shadow rounded-lg p-6">

                                <h2 className="text-xl font-bold mb-4">{props.idProject ? 'Modifier projet' : 'ajouter le projet'} </h2>
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="nom">Nom du projet</label>
                                        <input
                                            type="text"
                                            id="nom"
                                            onChange={getAttr}
                                            name="nom"
                                            value={nom}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"

                                        />
                                        {formErros && formErros.nom && !nom && (<span className="text-red-500">{formErros.nom}</span>)}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            onChange={getAttr}
                                            value={description}


                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                        />
                                        {formErros && formErros.description && !description && (<span className="text-red-500">{formErros.description}</span>)}

                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="date_de_debut">Date de début</label>
                                        <DatePicker
                                            value={date_debut ? dayjs(date_debut, dateFormat) : null }

                                            className="w-full"
                                            onChange={getDateDebut}
                                        />
                                        {formErros && formErros.date_debut && !date_debut && (<span className="text-red-500">{formErros.date_debut}</span>)}


                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="date_de_fin_prevue">Date de fin prévue</label>
                                        <DatePicker value={date_fin ? dayjs(date_fin, dateFormat) : null} className="w-full" onChange={getDateFin} />
                                        {formErros && formErros.date_fin && !date_fin && (<span className="text-red-500">{formErros.date_fin}</span>)}

                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="budget">Budget</label>
                                        <input
                                            type="number"
                                            onChange={getAttr}
                                            value={budget}
                                            id="budget"
                                            name="budget"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"

                                        />
                                        {formErros && formErros.budget && !budget && (<span className="text-red-500">{formErros.budget}</span>)}

                                    </div>

                                    <div className="mb-4" >
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="budget">Priorite</label>

                                        <Select
                                            className="w-full"
                                            value={priorite}
                                            onChange={getSelectedValue}
                                            options={options}
                                        />
                                        {formErros && formErros.priorite && !priorite && (<span className="text-red-500">{formErros.priorite}</span>)}


                                    </div>


                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="budget">Objectif</label>
                                        <textarea

                                            id="budget"
                                            onChange={getAttr}
                                            value={objectif}
                                            name="objectif"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"

                                        />
                                        {formErros && formErros.objectif && !objectif && (<span className="text-red-500">{formErros.objectif}</span>)}

                                    </div>
                                        {!props.idProject ? (     <div className="flex items-center mb-4 gap-5">
                                        <label className="text-gray-700 font-bold whitespace-nowrap" htmlFor="is_activate">Activer le projet</label>

                                        <Checkbox className="w-full" onChange={onChangeCheck}></Checkbox>
                                    </div>) : (null)}
                               

                                    <div className="flex justify-end">
                                        <Button disabled={loading} onClick={() => ajoutProjet()} type="primary" shape="round" size="large" >

                                            <div className={loading ? 'flex flex-row gap-5' : ''}>
                                                <Loader spiner={loading} />
                                                {!props.idProject ? (<span> {loading ? "Ajout du projet..." : "Ajouté un projet"} </span>
                                                ) : (<span> {loading  ? "Modification du projet..." : "Modifier le projet"} </span>
                                                )}

                                            </div>
                                        </Button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AddProject