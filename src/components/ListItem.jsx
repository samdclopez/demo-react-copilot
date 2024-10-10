//import React from "react";

// eslint-disable-next-line react/prop-types
function ListItem({id, description, amount, type, handleDelete}) {
    return (
        <li className="bg-white shadow rounded-lg px-4 py-2 mb-2 flex justify-between items-center w-full max-w-md"> 
                <div>
                    <h3 className="text-lg font-bold">{description}</h3>
                    <p className="text-sm text-gray-500">{type}</p>
                </div>
                <div className="flex items-center">
                    <span className="text-lg font-bold mr-4">${amount}</span>
                    <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" 
                        data-id={id}
                        onClick={ handleDelete }>
                        Delete
                    </button>
                </div>
        </li>

    )
}

export default ListItem;