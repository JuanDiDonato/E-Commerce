import React, { useState, useContext } from 'react'
import AdminServices from '../../Services/AdminServices';
import { AdminContext } from '../../Context/AdminContext'

export default function Categories() {

     const { categories, setCategories } = useContext(AdminContext)
     const [editMode, setEditMode] = useState(false)
     const [oldCategory, setOldCategory] = useState()

     const create_category = () => {
          const category = document.getElementById('category').value
          AdminServices.new_category(category).then(data => {
               console.log(data);
               alert(data.message)
               AdminServices.categories().then(data => {
                    ;
                    setCategories(data)
               })
          })
          document.getElementById('category').value = ''
     }

     const delete_category = (category) => {
          AdminServices.delete_category(category).then(data => {
               AdminServices.categories().then(data => {
                    setCategories(data)
               })
          })
     }

     const edit_mode = (category) => {
          setOldCategory(category)
          setEditMode(true)
          document.getElementById('category').value = category
     }
     const edit_category = () => {
          const category = document.getElementById('category').value
          AdminServices.edit_category(category, oldCategory).then(data => {
               console.log(data);
               AdminServices.categories().then(data => {
                    ;
                    setCategories(data)
               })
          })
          document.getElementById('category').value = ''
          setEditMode(false)
     }


     return (
          <div className="form">
               <div>
                    <h1>Lista de categorias</h1>
               </div>
               <div className="form-group">
                    <input type="text" id="category" placeholder="Nombre de la categoria" className="form-control" />
                    {editMode ?
                         <button className="btn" onClick={() => edit_category()}>Actualizar categoria</button>
                         :
                         <button className="btn" onClick={() => create_category()}>Añadir categoria</button>}

               </div>
               {categories.length > 0 ?
                    <div>

                         <div >
                              <table className="table-categories">
                                   <thead>
                                        <tr className="table-cat-thead">
                                             <th scope="col">Categoria</th>
                                             <th scope="col" className="text-primary">Editar</th>
                                             <th scope="col" className="text-danger">Borrar</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {categories.map(category => {
                                             return (
                                                  <tr className="table-cat-body" key={category.category}>
                                                       <th scope="col">{category.category}</th>
                                                       <th scope="row"><i style={{ cursor: 'pointer' }} onClick={() => edit_mode(category.category)} className="fa fa-pencil"></i></th>
                                                       <th scope="row"><i style={{ cursor: 'pointer' }} onClick={() => delete_category(category.category)} className="fa fa-trash"></i></th>
                                                  </tr>
                                             )
                                        })}

                                   </tbody>
                              </table>
                         </div>
                    </div> : null}
          </div>
     )
}
