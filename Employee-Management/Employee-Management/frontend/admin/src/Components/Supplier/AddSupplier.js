import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get, post, put } from './request'
import withRouteUtil from './withRouteUtil'
import AdminDashBoard from "../Employee/AdminDashBoard";

const Input = ({ name, label, onChange, value }) => {
    return (
        <div className="mb-3">
            <label htmlFor={`${name} ${label}`} className="form-label">{label}</label>

            <input
                type="text"
                className="form-control"
                id={`${name} ${label}`}
                name="name"
                onChange={event => onChange(event.target.value)}
                value={value}
            />
        </div>
    )
}

class AddSupplier extends Component {
    state = {
        createRequest: {},
        id: ''
    }

    async componentDidMount() {
        const params = this.props.params
        const id = params.id

        if (id) {
            this.setState({ id })

            const createRequest = await get(`supplier/${id}`)

            this.setState({ createRequest })
        }
    }

    handleInput(name, value) {
        const createRequest = { ...this.state.createRequest }

        createRequest[name] = value
        this.setState({ createRequest })
    }

    async addSupplier() {
        const supplier = await post('supplier', this.state.createRequest)

        this.props.navigate('/adhome')
    }

    async updateSupplier() {
        const supplier = await put('supplier', this.state.createRequest)

        this.props.navigate('/list')
    }

    render() {
        const { id, createRequest = {} } = this.state

        return (
            <div>
                <AdminDashBoard></AdminDashBoard>
            <div className="container-fluid mt-5">
                <div className="mx-auto w-50 shadow p-5">
                
                    <h3 className="mt-5">Fill the Details</h3>

                    <Input
                        name="name"
                        label="Supplier Name"
                        value={createRequest['name']}
                        onChange={(value) => this.handleInput('name', value)}/>

                    <Input
                        name="company"
                        label="Supplier Company"
                        value={createRequest['company']}
                        onChange={(value) => this.handleInput('company', value)}/>

                    <Input
                        name="phone"
                        label="Phone Number"
                        value={createRequest['phone']}
                        onChange={(value) => this.handleInput('phone', value)}/>

                    <Input
                        name="email"
                        label="Email"
                        value={createRequest['email']}
                        onChange={(value) => this.handleInput('email', value)}/>

                    <Input
                        name="address"
                        label="Address"
                        value={createRequest['address']}
                        onChange={(value) => this.handleInput('address', value)}/>

                    <div onChange={event => this.handleInput('category', event.target.value)}>
                        <label className="form-label">Product Category</label> <br/>

                        <input
                            type="radio"
                            value="Glasses"
                            name="gender"
                            checked={createRequest.category === 'Glasses'}/> Glasses
                        <br/>

                        <input
                            type="radio"
                            value="Sun Glasses"
                            name="gender"
                            checked={createRequest.category === 'Sun Glasses'}/> Sun Glasses
                        <br/>

                        <input
                            type="radio"
                            value="Lens"
                            name="gender"
                            checked={createRequest.category === 'Lens'}/> Lens
                        <br/>
                    </div>

                    {
                        id &&
                        <button className="mt-3 btn btn-primary" onClick={this.updateSupplier.bind(this)}>
                            Update
                        </button>
                    }

                    {
                        !id &&
                        <button className="mt-3 btn btn-primary" onClick={this.addSupplier.bind(this)}>
                            Add
                        </button>
                    }

                </div>
            </div>
            </div>
        )
    }
}

export default withRouteUtil(AddSupplier)