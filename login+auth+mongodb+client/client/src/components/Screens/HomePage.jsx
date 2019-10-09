import React, { memo } from 'react';
import { AuthTopBar, TextInputField } from './common';
import { Form } from 'react-final-form';
import { insertUserUrl } from '../../api/users';

const HomePage = () => (
	<div style={{ display: 'flex'}}>
		<AuthTopBar />
		<Form
			onSubmit={values => insertUserUrl(values).catch(e => e)}
			render={({ handleSubmit, submitError, submitting }) => (
				<div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', overflow: 'auto' }}>
					<div style={{ display: 'flex' }}>
						<form onSubmit={handleSubmit}>
							<div style={{ fontSize: '22px', background: 'red' }}>{submitError}</div>
							<h2>Insert Rtsp url</h2>
							<fieldset>
								<TextInputField name="url" placeholder="please enter your rtsp url" />
							</fieldset>
							<div style={{ padding: '20px 0' }}>
								<button disabled={submitting} type="submit">Add To list</button>
							</div>
						</form>
					</div>
				</div>
			)}
		/>
	</div>
);

export default memo(HomePage);
