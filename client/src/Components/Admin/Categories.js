import React, { useState, useContext } from 'react'
import AdminServices from '../../Services/AdminServices';
import { AdminContext } from '../../Context/AdminContext'
//Tabla
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function Categories() {

     const { categories, setCategories } = useContext(AdminContext)
     const [editMode, setEditMode] = useState(false)
     const [oldCategory, setOldCategory] = useState()

     const create_category = () => {
          const category = document.getElementById('category').value
          if(category.length === 0) alert('Ingrese un nombre') 
          else{
               AdminServices.new_category(category).then(data => {
                    alert(data.message)
                    AdminServices.categories().then(data => {
                         ;
                         setCategories(data)
                    })
               })
               document.getElementById('category').value = ''
          }
          
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
               alert(data.message)
               AdminServices.categories().then(data => {
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
                         <button className="btn" onClick={() => create_category()}>A??adir categoria</button>}

               </div>
               {categories.length > 0 ?
                    <div>

                         <div >
                              <Table className="table">
                                   <Thead>
                                        <Tr>
                                             <Th scope="col">Categoria</Th>
                                             <Th scope="col">Editar</Th>
                                             <Th scope="col">Borrar</Th>
                                        </Tr>
                                   </Thead>
                                   <Tbody>
                                        {/* eslint-disable-next-line */}
                                        {categories.map(category => {
                                             if(category.category !== 'Sin Categoria'){
                                                  return (
                                                       <Tr key={category.category}>
                                                            <Td scope="col">{category.category}</Td>
                                                            <Td scope="row"><i style={{ cursor: 'pointer' }} onClick={() => edit_mode(category.category)} className="fa fa-pencil"></i></Td>
                                                            <Td scope="row"><i style={{ cursor: 'pointer' }} onClick={() => delete_category(category.category)} className="fa fa-trash"></i></Td>
                                                       </Tr>
                                                  )
                                             }
                                        })}

                                   </Tbody>
                              </Table>
                         </div>
                    </div> : null}
          </div>
     )
}
