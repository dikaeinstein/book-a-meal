import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'formik';
import { ProgressBar } from 'react-materialize';
import Label from '../util/Label';
import Button from '../util/Button';
import Loading from '../util/Loading';
import cloudinaryImageUpload from '../../helpers/cloudinaryImageUpload';

export class UpdateMealForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUploading: false,
      imageUploaded: false,
      imageUploadError: false,
      imageUrl: undefined,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  async handleImageChange(event) {
    try {
      const file = event.target.files[0];

      this.setState({ imageUploading: true, imageUploaded: false });
      // upload image and get imageUrl
      const imageUrl = await cloudinaryImageUpload(file);
      this.props.values.imageUrl = imageUrl;
      this.setState({
        imageUploading: false,
        imageUploaded: true,
        imageUrl,
      });
    } catch (error) {
      this.setState({
        imageUploadError: true,
        imageUploading: false,
        imageUploaded: false,
      });
    }
  }

  render() {
    const {
      errors,
      touched,
      isUpdating,
    } = this.props;

    return (
      <Form className="form card">
        <div>
          <Label className="label label-block" htmlFor="name">
            Meal name:
          </Label>
          <Field
            placeholder="Enter meal name"
            name="name"
            required
            className={touched.name
            && errors.name ? 'input-error' : ''}
          />
          {
            touched.name
            && errors.name
            && <div className="error">{errors.name}</div>
          }
        </div>
        <div>
          <Label className="label label-block" htmlFor="price">
          Price (&#x20a6;):
          </Label>
          <Field
            type="number"
            placeholder="Enter price"
            name="price"
            required
            className={touched.price
            && errors.price ? 'input-error' : ''}
          />
          {
            touched.price
            && errors.price
            && <div className="error">{errors.price}</div>
          }
        </div>
        <div>
          <Label className="label label-block" htmlFor="description">
            Description:
          </Label>
          <Field
            component="textarea"
            placeholder="Enter price"
            name="description"
            required
            className={touched.description
            && errors.description ? 'input-error' : ''}
          />
          {
            touched.description
            && errors.description
            && <div className="error">{errors.description}</div>
          }
        </div>
        <div>
          <Label className="label label-block" htmlFor="image">
            Image:
          </Label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={this.handleImageChange}
          />
          {
            this.state.imageUploading
            ?
              <div className="text-dark text-center uploading">
                <small>
                  <Loading text="uploading image . . .">
                    <ProgressBar />
                  </Loading>
                </small>
              </div>
            : null
          }
          {
            this.state.imageUploaded ?
              <div className="text-dark">
                <div className="text-center">
                  <small>Image uploaded</small>
                </div>
                <img
                  src={this.state.imageUrl}
                  alt="meal preview"
                  className="meal-preview center"
                />
              </div> : null
          }
          {
            this.state.imageUploadError ?
              <div className="text-danger">
                <div className="text-center">
                  <small className="error">
                    Error uploading image, please try again
                  </small>
                </div>
              </div> : null
          }
        </div>
        <div>
          <Field
            type="hidden"
            name="imageUrl"
          />
        </div>
        <Button
          value="update meal"
          type="submit"
          className="btn btn-default font-weight-bold"
          disabled={isUpdating}
        />
        {isUpdating ?
          <Loading text="Saving Meal . . .">
            <ProgressBar />
          </Loading>
          : null}
        {!isUpdating && errors.updateMeal ?
          <div className="error text-center">
            {errors.updateMeal}
          </div>
          : null}
      </Form>
    );
  }
}

UpdateMealForm.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  isUpdating: PropTypes.bool.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  values: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isUpdating: state.meals.isUpdating,
});

export default connect(mapStateToProps)(UpdateMealForm);
