import React, { memo } from 'react';
import { Form } from 'react-final-form';
import { TextInputField, GuestTopBar } from './common';
import { registerUser } from '../../api/authentication';

const RegisterPage = () => (
  <div style={{ display: 'flex'}}>
		<GuestTopBar />
		<Form
			onSubmit={values => registerUser(values).catch(e => e)}
			render={({ handleSubmit, submitError, submitting }) => (
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', overflow: 'auto'}}>
          <div style={{ display: 'flex'}}>
						<form onSubmit={handleSubmit}>
              <div style={{ fontSize: '22px' }}>Create your account</div>
							<div style={{ fontSize: '22px', background: 'red' }}>{submitError}</div>
							<fieldset>
								<TextInputField name="firstName" label="First Name" placeholder="please enter your first name" />
								<TextInputField name="lastName" label="Last Name" placeholder="please enter your last name" />
								<TextInputField name="email" label="email" placeholder="please enter your email" />
								<TextInputField
									type="password"
									name="password"
									label="password"
									placeholder="please enter your password"
								/>
							</fieldset>
              <div style={{ padding: '20px 0' }}>
								<button disabled={submitting} type="submit">Create account</button>
							</div>
						</form>
					</div>
				</div>
			)}
		/>
	</div>
);

export default memo(RegisterPage);
