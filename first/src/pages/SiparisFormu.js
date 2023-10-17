import React from "react";
import { useState, useEffect } from "react";
//import axios from "axios";
import * as yup from "yup";
import "./SiparisFormu.css";
import { Button, NavLink } from "reactstrap";
/* import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"; */

import { useHistory } from 'react-router-dom';

const SiparisFormu = (props) => {
  //const { pizzaDetails, name, price } = props;

  let { price } = props;
  /*  let extras = [
    "Pepperoni",
    "Domates",
    "Biber",
    "Sosis",
    "Mısır",
    "Sucuk",
    "Kanada Jambonu",
    "Mantar",
    "Ananas",
    "Tavuk Izgara",
    "Jalepeno",
    "Kabak",
    "Soğan",
    "Sarımsak",
  ]; */
  const [count, setCount] = useState(1);
  const decrease = () => {
    setCount(count - 1);
  };
  const increase = () => {
    setCount(count + 1);
  };
  console.log(count);

  const initialForm = {
    size: { Küçük: false, Orta: false, Büyük: false },
    thickness: {
      "Hamur Kalınlığı": false,
      İnce: false,
      Normal: false,
      Kalın: false,
    },
    /* extraIngredients: [], */
    extraIngredients: {
      Pepperoni: false,
      Domates: false,
      Biber: false,
      Sosis: false,
      Mısır: false,
      Sucuk: false,
      "Kanada Jambonu": false,
      Mantar: false,
      Ananas: false,
      "Tavuk Izgara": false,
      Jalepeno: false,
      Kabak: false,
      Soğan: false,
      Sarımsak: false,
    },
    note: "",
    quantity: count,
  };

  /* const initialError = {
    size: "",
    thickness: "",
  }; */

  const [formData, setFormData] = useState(initialForm);
  //const [errors, setErrors] = useState(initialError);
  const [isDisabled, setIsDisabled] = useState(true);

  const history = useHistory();


  //console.log("q", formData.quantity);

  /* function DropdownFunction(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
  } */

  let numberOfIngredients = 0;
  for (let key in formData.extraIngredients) {
    if (formData.extraIngredients[key] === true) {
      numberOfIngredients++;
    }
  }

  const newPrice = (price) => {
    if (
      formData.size !== "Küçük" &&
      formData.size !== "Orta" &&
      formData.size !== "Büyük"
    ) {
      return (price -= price);
    } else if (formData.size === "Küçük") {
      return price;
    } else if (formData.size === "Orta") {
      return (price += 10);
    } else if (formData.size === "Büyük") {
      return (price += 20);
    }
  };

  const formSchema = yup.object().shape({
    // size: yup.oneOf(formData.size, "Sadece birini seçmelisiniz."),
    size: yup
      .object()
      .shape({
        Küçük: yup.boolean(),
        Orta: yup.boolean(),
        Büyük: yup.boolean(),
      })
      .test(
        "Sadece birini seçiniz.",
        (value) => (Object.values(value).filter(Boolean).length = 1)
      ),
    /*  .object().shape({
        yup.string().oneOf(Object.key(formData.size,"Birini seçmelisiniz.))}), */
    thickness: yup
      .object()
      .shape({
        "Hamur Kalınlığı": yup.boolean(),
        İnce: yup.boolean(),
        Normal: yup.boolean(),
        Kalın: yup.boolean(),
      })
      .test(
        "Sadece birini seçebilirsiniz.",
        (value) => (Object.values(value).filter(Boolean).length = 1)
      ),
    extraIngredients: yup
      .object()
      .shape({
        Pepperoni: yup.boolean(),
        Domates: yup.boolean(),
        Biber: yup.boolean(),
        Sosis: yup.boolean(),
        Mısır: yup.boolean(),
        Sucuk: yup.boolean(),
        "Kanada Jambonu": yup.boolean(),
        Mantar: yup.boolean(),
        "Tavuk Izgara": yup.boolean(),
        Jalepeno: yup.boolean(),
        Kabak: yup.boolean(),
        Soğan: yup.boolean(),
        Sarımsak: yup.boolean(),
      })
      /* .test("En fazla 10 malzeme seçebilirsiniz.", numberOfIngredients <= 10), */
      .test(
        "En fazla 10 malzeme seçebilirsiniz.",
        (value) => Object.values(value).filter(Boolean).length <= 10
      ),

    /*
    thickness: yup.string().oneOf((value) => Object.key(value)), */
    /* extraIngredients: yup
      .array()
      .max(10, "En fazla 10 malzeme seçebilirsiniz."), */
    /* extraIngredients: yup
      .object()
      .test(
        "En fazla 10 malzeme seçebilirsiniz.",
        (value) => Object.values(value).filter(Boolean).length <= 10
      ), */
    //.of(yup.string().required()),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setIsDisabled(valid));
  }, [formData]);

  const changeHandler = (event) => {
    let name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    let newFormData = {
      ...formData,
      [name]: value,
    };

    if (event.target.type === "checkbox") {
      // if (event.target.checked) {
        newFormData = {
          ...formData,
          extraIngredients: { ...formData.extraIngredients, [name]: event.target.checked },
        };
      // }
    } else {
      newFormData = {
        ...formData,
        [name]: value,
      };
    }

    /*  if (name === "quantity") {

      newFormData = {
        ...formData,
        quantity: { ...formData.quantity, [name]: value },
      };
    } */
    console.log(newFormData);

    /*  let newFormData = {
      ...formData,
      size: { ...formData.size, [name]: value },
      thickness: { ...formData.thickness, [name]: value },
      extraIngredients: { ...formData.extraIngredients, [name]: value },
      note: { ...formData.note, [name]: value },
      quantity: { ...formData.quantity, [name]: value },
    };
    console.log(newFormData); */

    /*  if (event.target.type === "checkbox") {
      if (event.target.checked) {
        newFormData = {
          ...formData,
          extraIngredients: { ...formData.extraIngredients, value },
        };
      }
    } else {
      newFormData = {
        ...formData,
        [name]: value,
      };
    } */

    /*  if (event.target.type === "checkbox") {
      if (event.target.checked) {
        newFormData = {
          ...formData,
          extraIngredients: { ...formData.extraIngredients, [name]: value },
        };
      }
    } else {
      newFormData;
    }
 */
    //extraIngredients: { ...formData.extraIngredients, [name]: value },

    /* if (event.target.type === "checkbox") {
      for (let i = 0; i < extras.length; i++) {
        if (extras[i] === event.target.checked) {
          newFormData.extraIngredients.push(name);
        } else {
          const index = newFormData.extraIngredients.indexOf(name);
          newFormData.extraIngredients.splice(index, 1);
        }
      }
      name = "extraIngredients";
      value = newFormData.extraIngredients;
    } else {
      newFormData[name] = value;
    } */

    /* if(event.target.type==="checkbox"){
      if(event.target.checked){
        Object.values(extraIngredients)=true;
        newFormData={...formData,extraIngredients};
      }else{
        Object.values(extraIngredients)=false;

      } */

    //}

    /* ...formData.extraIngredients,
      [name]: value, */
    setFormData(newFormData);

    /*  yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        const newErrors = { ...errors, [name]: "" };
        setErrors(newErrors);
      })
      .catch((error) => {
        const newErrors = { ...errors, [name]: error.errors[0] };
        setErrors(newErrors);
      }); */
    /*  yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [name]: error.errors[0] });
      }); */
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // Sipariş bilgilerini topla
    const orderData = {
      pizzaName: "Position Absolute Acı Pizza",
      size: formData.size,
      thickness: formData.thickness,
      extraIngredients: formData.extraIngredients,
      totalPrice: count * (numberOfIngredients * 5 + newPrice(price))
    };

    // Sipariş Alındı sayfasına yönlendir ve bilgileri geçir
    history.push('/siparisalindi', orderData);
    setFormData(initialForm);
  };


  return (
    <form id="pizza-form" onSubmit={submitHandler}>
      {/* <div>{props.pizzaDetails.name}</div>
      <div>{props.pizzaDetails.price}</div> */}
      <div className="size-thickness-options">
        <div className="size">
          <p className="titles">Boyut Seç</p>
          <span>*</span>
          <div className="size-options">
            <div className="size-option">
              <input
                id="küçük"
                name="size"
                type="radio"
                value="Küçük"
                ckecked={formData.size === "Küçük"}
                onChange={changeHandler}
              />
              <label htmlFor="küçük">Küçük</label>
            </div>
            <div className="size-option">
              <input
                id="orta"
                name="size"
                type="radio"
                value="Orta"
                checked={formData.size === "Orta"}
                onChange={changeHandler}
              />
              <label htmlFor="orta">Orta</label>
            </div>
            <div className="size-option">
              <input
                id="büyük"
                name="size"
                type="radio"
                value="Büyük"
                checked={formData.size === "Büyük"}
                onChange={changeHandler}
              />
              <label htmlFor="büyük">Büyük</label>
            </div>
          </div>
        </div>
        <div className="thickness">
          <p className="titles">Hamur Seç</p>
          <span>*</span>
          <div
            className="thickness-options"
            onChange={changeHandler}
            /* DropdownFunction={DropdownFunction} */
          >
            {/*    <Dropdown isOpen={dropdownOpen} toggle={toggle} {...props}>
              <DropdownToggle caret size="lg">
                Hamur Kalınlığı
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Hamur Kalınlığı</DropdownItem>
                <DropdownItem>İnce</DropdownItem>
                <DropdownItem>Normal</DropdownItem>
                <DropdownItem>Kalın</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
            <select onChange={changeHandler} name="thickness" id="thickness">
              <option value="">Hamur kalınlığı</option>
              <option selected={formData.thickness === "İnce"} value="İnce">
                İnce
              </option>
              <option selected={formData.thickness === "Normal"} value="Normal">
                Normal
              </option>
              <option selected={formData.thickness === "Kalın"} value="Kalın">
                Kalın
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="extra-ingredients-container">
        <p className="titles">Ek Malzemeler</p>
        <p className="extra-ingredients-details">
          En fazla 10 malzeme seçebilirsiniz.5₺
        </p>
        <div className="extra-ingredients">
          {Object.keys(formData.extraIngredients).map((item, index) => (
            <div className="checkbox-input-label">
              <input
                id={item}
                name={item}
                type="checkbox"
                checked={formData.extraIngredients.item}
                onChange={changeHandler}
              ></input>
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
          {/* {extras.map((item) => (
            <div className="checkbox-input-label">
              <input
                id={item}
                name={item}
                type="checkbox"
                checked={formData.extraIngredients.includes(item)}
                onChange={changeHandler}
              ></input>
              <label htmlFor={item}>{item}</label>
            </div>
          ))} */}
        </div>
      </div>

      <div className="order-note-container">
        <p className="titles">Sipariş Notu</p>
        <textarea
          id="orderNote"
          name="orderNote"
          placeholder="Siparişine eklemek istediğin bir not var mı ?"
          onChange={changeHandler}
        ></textarea>
      </div>

      <div className="counter-total">
        <div className="counter">
          <div className="counter-decrease">
            <Button
              onChange={changeHandler}
              color="warning"
              size="lg"
              name="quantity-button"
              type="button"
              onClick={decrease}
              disabled={count <= 1 ? true : false}
            >
              -
            </Button>
          </div>
          <div
            className="counter-count"
            name="quantity"
            value={formData.quantity}
          >
            {count}
          </div>
          <div className="counter-increase">
            <Button
              onChange={changeHandler}
              color="warning"
              size="lg"
              name="quantity-button"
              type="button"
              onClick={increase}
              disabled={count >= 10 ? true : false}
            >
              +
            </Button>
          </div>
        </div>
        <div className="total-button">
          <div className="order-total" style={{ paddingLeft: '10px' }}>
            <div className="siparis-toplami">Sipariş Toplamı</div>
            <div className="secimler">
              Seçimler:
              {numberOfIngredients * 5}₺
            </div>
            <div className="toplam">
              Toplam:
              {count * (numberOfIngredients * 5 + newPrice(price))}₺
            </div>
          </div>
          <div className="order-button">
              <Button id="order-button" color="warning" disabled={isDisabled} type="submit">
                SİPARİŞ VER
              </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default SiparisFormu;
