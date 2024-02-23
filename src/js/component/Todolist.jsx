import React, { useState, useEffect } from "react";

export const Todolist = () => {

    // Estados
    const [activeIndex, setActiveIndex] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [tareas, setTareas] = useState([]);
    const [error, setError] = useState(false);

    // Funciones

    let nombreDeUsuario = "NDavidGR"
    function crearUsuario() {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${nombreDeUsuario}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        })
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);
            })
    }
    useEffect(function () {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${nombreDeUsuario}`)
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);
                if (resultado.msg == "The user NDavid doesn't exists") {
                    setError(true)
                    return;
                }
                setTareas(resultado)
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })

    }, [])

    useEffect(function () {
        if (error == true) {
            crearUsuario()
            setError(false)
        }
        console.log("se creo un nuevo usuario", error);
    }, [error])

    useEffect(function () {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${nombreDeUsuario}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tareas)
        })
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);
            })
    }, [tareas])




    function handleChange(event) { setInputValue(event.target.value) };

    function handleSubmit(event) {
        event.preventDefault()
        if (inputValue.trim() !== "") {
            setTareas([...tareas, { label: inputValue.trim(), done: false }])
            setInputValue("")
        }
    };

    function handleDelete(i) {
        const newList = [...tareas];
        newList.splice(i, 1);
        setTareas(newList);
    };

    function handleSelect(i) { setActiveIndex(i); };

    // HTML

    return (
        <div className="container">
            <h1 className="text-secondary text-center mt-5">To Do List</h1>
            <div className="row d-flex justify-content-center">
                <form className="col-xs-auto col-md-6" onSubmit={handleSubmit}>
                    <input className="form-control" type='text' value={inputValue} onChange={handleChange} placeholder="Feed the cats" />
                </form>
            </div>
            <div className="row d-flex justify-content-center">
                <ul className="col-xs-auto col-md-6 list-group mt-4">
                    {tareas.map((tarea, i) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center text-wrap text-break" key={i} onMouseEnter={(index) => handleSelect(i)} onMouseLeave={() => handleSelect(null)}>
                            {tarea.label}
                            <button className={`btn btn-close${activeIndex === i ? '' : 'visually-hidden'}`} onClick={() => handleDelete(i)} key={i}></button>
                        </li>
                    ))}
                </ul>
                <div className="row d-flex justify-content-center">
                    <div className="col-xs-auto col-md-6 text-end mt-3">{tareas.length} Pending Task</div>
                </div>

            </div>
        </div>
    );
}