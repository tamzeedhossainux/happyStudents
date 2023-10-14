import React from 'react';
import './SubmitQuestions.css';
const SubmitQuestions = () => {
    return (
        <>
            <section className='container'>
                <section className='mt-4'>
                    <h3 id='text-submit'><span className='text-submit'>Submit Yo</span>ur Questions</h3>
                    <form>
                        <div className="row">
                            <div className="col">
                                <label className='input-text' htmlFor="name">Name</label>
                                <input type="text" name='name' className="form-control input-text input-field" placeholder="Your Name" />
                            </div>
                            <div className="col">
                                <label htmlFor="email" className='input-text'>Email Address</label>
                                <input type="email" name='email' className="form-control input-field input-text" placeholder="Your Email Address" />
                            </div>
                        </div><br />
                        <div className="col">
                            <label htmlFor="name" className='input-text'>Subject</label>
                            <input type="text" className="form-control  input-text input-subject" placeholder="Subject of your questions" />
                        </div><br />
                        <div className="col">
                            <label htmlFor="name" className='input-text'>Last Name</label>
                            <input type="text" className="form-control  input-text input-lastName" placeholder="Enter your comments" />
                        </div><br /><br />
                        <section className='d-flex'>
                            <div >
                                <h1 id='multiple-text'>Add Multiple options</h1>
                                <div className='option'>
                                    <input type="radio" name="option 1" className='text-option' /> Option 1

                                </div><br />
                                <div className='option'>
                                    <input type="radio" name="option 1" className='text-option' /> Option 1

                                </div><br />
                                <div className='option'>
                                    <input type='radio' id='circle'></input><span id='text-circle'> Add option or "Add More"</span>
                                    {/* <input type="radio" name="option 1" className='text-option' /> Add option or "Add More" */}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1 className='text_file'>File Upload</h1>
                                    <div className="file_upload">
                                        <h5 id='file-drop'>Select a file or drag and drop here</h5>
                                        <p id='file-size'>JPG PNG or PDF, file size no more than 10MB</p>
                                        <button className='file_button'>SELECT FILE</button>
                                    </div><br />
                                    <button className='file_submit'>Submit</button>
                                </div>
                            </div>
                        </section>
                    </form>

                </section>
            </section>
        </>
    );
};

export default SubmitQuestions;
