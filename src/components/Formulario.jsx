import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Container, Col } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../styles.css";

// La api
import { geoUbicacion , planetas } from "../helpers/api";


const SignupForm = () => {
 // const [isUbicacion, setUbicacion] = useState({});

  const formik = useFormik({
    initialValues: {
      user: "",
      email: "",
      password1: "",
      password2: "",
      firstName: "",
      secondName: "",
      lastName: "",
      country: "",
      estate: "",
      city: "",
      datetimepicker: new Date(),
      lat: "",
      lng: "",
      sun: "",
      moon: ""
    },
    validationSchema: Yup.object({
      user: Yup.string().max(15, "Máximo 15 caracteres").required("Requerido"),
      email: Yup.string()
        .email("Dirección de correo inválida")
        .required("Requerido"),
      password1: Yup.string()
        .min(8, "Mínimo 8 caracteres")
        .required("Requerido"),
      password2: Yup.string()
        .min(8, "Mínimo 8 caracteres")
        .oneOf(
          [Yup.ref("password1"), null],
          "Las constraseñas deben ser iguales"
        )
        .required("Requerido"),
      firstName: Yup.string()
        .max(15, "Máximo 15 caracteres")
        .required("Requerido"),
      secondName: Yup.string().max(15, "Máximo 15 caracteres"),
      lastName: Yup.string()
        .max(20, "Máximo 20 caracteres")
        .required("Requerido"),
      country: Yup.string().required("Requerido"),
      estate: Yup.string().required("Requerido"),
      city: Yup.string().required("Requerido"),
      datetimepicker: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values) => {
      const { city, estate, country } = formik.values;

      console.log("On Submit");
      const ubicacion = await geoUbicacion(city, estate, country);
      console.log(ubicacion);
      formik.values.lat=ubicacion.lat;
      formik.values.lng=ubicacion.lng;
      const planetasData = await planetas();
      formik.values.sun=planetasData[0];
      formik.values.moon=planetasData[1];
      console.log('desde el componente', planetasData);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container>
      <Col md={{ span: 4, offset: 4 }} className="card">
        <h1>Registrarse</h1>
        <form onSubmit={formik.handleSubmit}>
          <label>Usuario</label>
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

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            className="form-control"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
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

          <label>Confirme la contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password2 && formik.errors.password2 ? (
            <div>{formik.errors.password2}</div>
          ) : null}

          <label htmlFor="firstName">Primer Nombre</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            id="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}

          <label htmlFor="secondName">Segundo Nombre</label>
          <input
            type="text"
            className="form-control"
            name="secondName"
            id="secondName"
            value={formik.values.secondName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}

          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            id="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}

          <label htmlFor="countryId">Pais</label>
          <select
            name="country"
            className="countries form-control"
            value={formik.values.country}
            onChange={formik.handleChange}
            id="countryId"
          >
          <option value="">Select Country</option>
          </select>
          <label htmlFor="stateId">Estado</label>
          <select
            name="estate"
            className="states  form-control"
            value={formik.values.estate}
            onChange={formik.handleChange}
            id="stateId"
          >
          <option value="">Select State</option>
          </select>
          <label htmlFor="cityId">Ciudad</label>
          <select
            name="city"
            className="cities  form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
            id="cityId"
          >
          <option value="">Select City</option>
          </select>

          <label htmlFor="datetimepicker">Fecha de nacimiento</label>
          <DateTimePickerComponent
            id="datetimepicker"
            placeholder="Fecha de nacimiento"
            step={(formik.values.datetimepicker.interval = 1)}
            format="dd-MM-yyyy hh:mm"
            value={formik.values.datetimepicker}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button type="submit" className="btn btn-primary purple">
            Registrarse
          </button>
          <Helmet>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
            <script src="//geodata.solutions/includes/countrystatecity.js"></script>
            <script src="https://unpkg.com/opencage-api-client@0.3.0/dist/opencage-api.min.js"></script>
          </Helmet>
        </form>
      </Col>
    </Container>
  );
};

export default SignupForm;
