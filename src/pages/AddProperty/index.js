import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import querySearch from "stringquery";
import classNames from "classnames";
import PropTypes from "prop-types";

import { Form, File } from "./styles";

import api from "../../services/api";

class AddProperty extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  state = {
    title: "",
    address: "",
    price: "",
    error: "",
    files: []
  };

  componentDidMount() {
    const params = querySearch(this.props.location.search);
    if (
      !params.hasOwnProperty("latitude") ||
      !params.hasOwnProperty("longitude")
    ) {
      alert("É necessário definir a latitude e longitude para um imóvel.");
      this.props.history.push("/app");
    }

    this.setState({ ...params });
  }

  handleDrop = files => this.setState({ files });

  renderFiles() {
    const { files } = this.state;
    return !files.length ? (
      <p>Jogue as imagens ou clique aqui para adiciona-las</p>
    ) : (
      files.map(file => <img key={file.name} src={file.preview} />)
    );
  }

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { title, address, price, latitude, longitude, files } = this.state;

      if (!title || !address || !price || !latitude || !longitude) {
        this.setState({ error: "Preencha todos os campos" });
        return;
      }

      const {
        data: { id }
      } = await api.post("/properties", {
        title,
        address,
        price,
        latitude,
        longitude
      });

      if (!files.length) this.props.history.push("/app");

      const data = new FormData();
      files.map((file, index) =>
        data.append(`image[${index}]`, file, file.name)
      );

      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      await api.post(`/properties/${id}/images`, data, config);

      this.props.history.push("/app");
    } catch (err) {
      this.setState({ error: "Ocorreu algum erro ao adicionar o imóvel" });
    }
  };

  handleCancel = e => {
    e.preventDefault();

    this.props.history.push("/app");
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Adicionar imóvel</h1>
        <hr />
        {this.state.error && <p>{this.state.error}</p>}
        <input
          type="text"
          placeholder="Título"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Endereço"
          onChange={e => this.setState({ address: e.target.value })}
        />
        <input
          type="decimal"
          placeholder="Preço"
          onChange={e => this.setState({ price: e.target.value })}
        />
        <File
          multiple
          onDrop={this.handleDrop}
          className={classNames({ "without-files": !this.state.files.length })}
        >
          {this.renderFiles()}
        </File>
        <div className="actions">
          <button type="submit">Adicionar</button>
          <button onClick={this.handleCancel} className="cancel">
            Cancelar
          </button>
        </div>
      </Form>
    );
  }
}

export default withRouter(AddProperty);
