import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
registerLocale("en-GB", enGB);
import css from "./BookingForm.module.css";

const BookingForm = () => {
  const initialValues = { name: "", email: "", bookingDate: "", comment: "" };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const Schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(14, "Too Long!")
      .required("Required!"),
    email: Yup.string().email("Invalid email").required("Required!"),
    bookingDate: Yup.date()
      .typeError("Invalid date format!")
      .min(tomorrow, "Booking date cannot be earlier than tomorrow!")
      .required("Required!"),
    comment: Yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(formData, { resetForm }) => {
        toast.success("Successfully booked!");
        resetForm();
      }}
    >
      {({ setFieldValue }) => (
        <Form className={css.containerBooking}>
          <div className={css.contentTitle}>
            <h3 className={css.title}>Book your campervan now</h3>
            <p className={css.subTitle}>
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <div className={css.containerForm}>
            <Field
              className={css.fieldForm}
              name="name"
              type="text"
              placeholder="Name*"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="name"
              component="div"
            />

            <Field
              className={css.fieldForm}
              name="email"
              type="email"
              placeholder="Email*"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="div"
            />
            <div>
              <Field name="bookingDate">
                {({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => setFieldValue("bookingDate", date)}
                    placeholderText="Booking date*"
                    dateFormat="dd.MM.yyyy"
                    className={css.fieldForm}
                    locale="en-GB"
                  />
                )}
              </Field>
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="bookingDate"
              component="div"
            />
            <Field
              className={`${css.fieldForm} ${css.textArea}`}
              name="comment"
              type="text"
              placeholder="Comment"
              as="textarea"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="comment"
              component="div"
            />
          </div>

          <button className={css.btnForm} type="submit">
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;
