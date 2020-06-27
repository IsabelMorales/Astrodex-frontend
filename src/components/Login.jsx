import React from 'react';
import { Container, Col} from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles.css';

const SignupForm = () => {

    const formik = useFormik({
        initialValues: {
            user: '',
            password1: ''
        },
        validationSchema: Yup.object({
            user: Yup.string()
              .required('Requerido'),
            password1: Yup.string()
                .required('Requerido'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return(
        <Container>
            <Col md={{ span: 4, offset: 4 }} className="card" >
                
                <form onSubmit={formik.handleSubmit} >
                    <h1 justify="center">Inicio de Sesión</h1>
                    <br/>
                    <label>Usuario o correo electrónico</label>
                    <input
                        type="text"
                        className="form-control"
                        name="user"
                        id="user"
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.user && formik.errors.user ? (
                        <div>{formik.errors.user}</div>
                    ) : null}

                    <label>Contraseña</label>
                    <input
                        type="password" 
                        className="form-control" 
                        name="password1"  
                        value={formik.values.password1} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password1 && formik.errors.password1 ? (
                        <div>{formik.errors.password1}</div>
                    ) : null}

                    <br/>
                    <button type="submit" className="btn btn-primary purple boton" >Iniciar Sesión</button>
                    <br/>
                </form>
            </Col>
        </Container>
    );         
};

export default SignupForm;