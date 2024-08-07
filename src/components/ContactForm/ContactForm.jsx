import { useId } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

import css from './ContactForm.module.css';

const ContactFormMap = Yup.object().shape({
  name: Yup.string().min(3, 'To Short!').max(50, 'Too Long!').required('Required'),
  number: Yup.string().min(3, 'To Short!').max(50, 'Too Long!').required('Required'),
});

const INITIAL_VALUES = {
  name: '',
  number: '',
};

const ContactForm = ({ addContact }) => {
  const nameId = useId();
  const numberId = useId();

  const onSubmit = (values, { resetForm }) => {
    addContact({ id: nanoid(), ...values });
    resetForm();
  };

  return (
    <Formik
      validationSchema={ContactFormMap}
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
    >
      <Form className={css.form}>
        <div className={css.field}>
          <label htmlFor={nameId}>Name</label>
          <Field type="text" name="name" id={nameId} />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.field}>
          <label htmlFor={numberId}>Number</label>
          <Field type="tel" name="number" id={numberId} />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;