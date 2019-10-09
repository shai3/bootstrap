import React, { memo } from 'react';
import { Form } from 'react-final-form';
import { TextInputField, GuestTopBar } from './common';
import { loginUser } from '../../api/authentication';

const LoginPage = () => (
	<div style={{ display: 'flex'}}>
		<GuestTopBar />
		<Form
			onSubmit={values => loginUser(values).catch(e => e)}
			render={({ handleSubmit, submitError, submitting }) => (
				<div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', overflow: 'auto'}}>
					<div style={{ display: 'flex'}}>
						<form onSubmit={handleSubmit}>
							<div style={{ fontSize: '22px' }}>Sign in</div>
							<div style={{ fontSize: '22px', background: 'red' }}>{submitError}</div>
							<fieldset>
								<TextInputField name="email" label="email" placeholder="please enter your email" />
								<TextInputField
									type="password"
									name="password"
									label="password"
									placeholder="please enter your password"
								/>
							</fieldset>
							<div style={{ padding: '20px 0' }}>
								<button disabled={submitting} type="submit">Sign in</button>
							</div>
						</form>
					</div>
				</div>
			)}
		/>
	</div>
);

export default memo(LoginPage);
