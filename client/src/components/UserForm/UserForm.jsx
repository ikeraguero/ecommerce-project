import { MoonLoader } from "react-spinners";
import { useUsersFormContext } from "../../hooks/useUsersFormContext";

import styles from "./UserForm.module.css";
import { useRoles } from "../../api/roles.api";

function UserForm({ formRef, handleImageChange, send }) {
  const { state, dispatch } = useUsersFormContext();
  const { data: roles, error, isLoading } = useRoles();

  if (isLoading) {
    return (
      <div>
        <div className={styles.spinnerContainer}>
          <MoonLoader size={50} color="#000000" speedMultiplier={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  const {
    isAddingUser,
    isEditingUser,
    editUser,
    productName,
    productCategory,
    productDescription,
    productPrice,
    productQuantity,
  } = state;

  return (
    <div>
      <span className={styles.formTop}>
        {!isEditingUser ? "Add New User" : `Edit ${editUser?.email}`}
        <ion-icon
          name="close-outline"
          onClick={() =>
            dispatch({ type: isAddingUser ? "toggleAdd" : "closeEdit" })
          }
        ></ion-icon>
      </span>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          if (isEditingUser) {
            send("put", formData);
            return;
          }
          send("post", formData);
        }}
      >
        <div className={styles.formBody}>
          <div className={styles.formItem}>
            <label htmlFor="userFirstName">First Name</label>
            <input
              onChange={(e) =>
                dispatch({ type: "changeName", payload: e.target.value })
              }
              name="userFirstName"
              className={styles.addFormInput}
              value={isEditingUser ? productName : null}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="userLastName">Last Name</label>
            <input
              onChange={(e) =>
                dispatch({ type: "changePrice", payload: e.target.value })
              }
              name="userLastName"
              className={styles.addFormInput}
              value={isEditingUser ? productPrice : null}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="userPassword">Password</label>
            <input
              onChange={(e) =>
                dispatch({
                  type: "changeQuantity",
                  payload: e.target.value,
                })
              }
              name="userPassword"
              value={isEditingUser ? productQuantity : null}
              className={styles.addFormInput}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="userRole">Role</label>
            <select
              onChange={(e) =>
                dispatch({
                  type: "changeCategory",
                  payload: e.target.value,
                })
              }
              name="userRole"
              id="userRole"
              value={isEditingUser ? productCategory : null}
              className={styles.addFormSelect}
            >
              {roles?.map((role) => (
                <option value={role?.id} key={role?.id}>
                  {role?.name[0].toUpperCase() + role?.name.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="userEmail">Email</label>
            <input
              name="userEmail"
              type="email"
              value={isEditingUser ? productDescription : null}
              onChange={(e) =>
                dispatch({
                  type: "changeDescription",
                  payload: e.target.value,
                })
              }
              className={styles.addFormInput}
            />
          </div>
        </div>
        <button className={styles.sendButton}>+</button>
      </form>
    </div>
  );
}

export default UserForm;
