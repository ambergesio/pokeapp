import Loading from '../components/Loading';
import { usePokemon } from '../hooks/usePokemon';
import React, {useState, useEffect } from 'react';

const Homepage = () => {
    
    let defaultCant:number = 10;
    let defaultPage:number = 1;
    const { isLoading, allPokemons } = usePokemon();
    const [ currentPage, setCurrentPage ] = useState<number>( defaultPage);
    const [ pokesPerPage, setPokesPerPage ] = useState<number>(defaultCant);
    const [ amountOfPages, setAmountOfPages ] = useState<number>(1);
    const [ changeResultsPerPage, setChangeResultsPerPage] = useState<boolean>(false);
    const [ search, setSearch ] = useState('');
    
    // const filteredPokemons = search.length === 0 ? allPokemons.slice((currentPage - 1) * pokesPerPage, (currentPage - 1) * pokesPerPage + pokesPerPage)
    // : allPokemons.filter( poke => poke.name.includes(search));

    const filteredPokemons = () => {
        return search.length === 0 ? allPokemons.slice((currentPage - 1) * pokesPerPage, (currentPage - 1) * pokesPerPage + pokesPerPage)
        : allPokemons.filter( poke => poke.name.includes(search));
    }

    useEffect( () => {
        currentPage === 0 ? setCurrentPage(1) : setCurrentPage(currentPage);
        changeResultsPerPage ? setPokesPerPage(5) : setPokesPerPage(defaultCant); 
        setAmountOfPages(Math.ceil(allPokemons.length / pokesPerPage))

    }, [currentPage, amountOfPages, changeResultsPerPage, setPokesPerPage, setAmountOfPages, allPokemons, pokesPerPage, defaultCant])
    
    useEffect( () => {
        currentPage >= amountOfPages && setCurrentPage(amountOfPages)
    }, [currentPage, amountOfPages, setCurrentPage])

    const prevPage = () => {
        // currentPage > 1 && currentPage <= amountOfPages ? setCurrentPage(currentPage - 1) : setCurrentPage(amountOfPages);
        currentPage > 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(currentPage);
    }
    
    const nextPage = () => {
        currentPage < amountOfPages ? setCurrentPage(currentPage + 1) : setCurrentPage(amountOfPages);
    }

    const toggleResultsPerPage = () => {
        setChangeResultsPerPage(!changeResultsPerPage);
    }

    const changePage = (e:any) => {
        const input = Number(e.target.value);
        !isNaN(input) ? console.log(input) : console.log("esto no es un numero");
        (!isNaN(input) || input > currentPage || input < 1 ) && setCurrentPage(input)
    }

    const startSearch = (e:any) => {
        const input = e.target.value;
        setSearch(input);
    }


    return (
        <div className="mt-5">
            <div className="mb-5">
                <h1>List of Pokémons</h1>
            </div>
            <input className="m-2 form-control" type="text" autoComplete="off" placeholder='Search pokémons by name' onChange={startSearch} />
            <div className="d-flex justify-content-start align-items-center mt-5 mb-5">
                <button className="m-2 btn btn-primary" style={{margin: 5}} onClick={prevPage}>prev</button>
                <input className="m-2" type="text" autoComplete="off" maxLength={3} style={{width: 40}} placeholder={currentPage.toString()} value={currentPage.toString()} onChange={changePage} />
                <button className="m-2 btn btn-primary" style={{margin: 5}} onClick={nextPage}>next</button>
                <p className="m-2">of</p>
                <p className="m-2" style={{width: 40}}>{amountOfPages}</p>
                <div className="form-check form-switch" style={{marginLeft: 50}}>
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={toggleResultsPerPage} />
                    <label className="form-check-label">{changeResultsPerPage ? "Switch off to show 10 results per page" : "Switch on to show 5 results per page"}</label>
                </div>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>IMAGE</th>
                </tr>
                </thead>
                <tbody>
                {
                    filteredPokemons().map( ({id, name, pic}) =>
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td><a href={pic} rel="noreferrer" target="_blank"><img style={{ width: 90}} src={pic} alt={name}/></a></td>
                        </tr>
                    )
                }
                </tbody>
            </table>

            {
                isLoading && <Loading />
            }
        </div>
    )
}

export default Homepage;