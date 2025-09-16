import { useEffect } from 'react';
import InputField from './fields/InputField';
import SelectField from './fields/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/bookAPI';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateBook = () => {
    const { id } = useParams();
    const { register, handleSubmit, setValue, reset } = useForm();

    const { data, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
    const book = data?.book;
    const [updateBook] = useUpdateBookMutation();

    useEffect(() => {
        if (book) {
            setValue('title', book.title);
            setValue('description', book.description);
            setValue('category', book.category);
            setValue('trending', book.trending);
            setValue('oldPrice', book.oldPrice);
            setValue('newPrice', book.newPrice);
            setValue('coverImage', book.coverImage);
        }
    }, [book, setValue])

    const onSubmit = async (data) => {
        const updateBookData = {
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: data.coverImage || book.coverImage,
        };

        try {
            await axios.patch(`${getBaseUrl()}/api/v1/books/${id}`, updateBookData, {
                headers: {
                    'Content-Type': 'application/json',  // Make sure this header is set
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            // custom alert
            Swal.fire({
                title: "Book Added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Exit"
            });

            await refetch();
        } catch (error) {
            console.error(error);
            alert('Failed to update book.');
        }
    }

    if (isLoading) return <Loading />
    if (isError) return <div>Error loading book data</div>

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                />

                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                />
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                <InputField
                    label="Cover Image URL"
                    name="coverImage"
                    type="text"
                    placeholder="Cover Image URL"
                    register={register}
                />

                <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
                    Update Book
                </button>
            </form>
        </div>
    )
}

export default UpdateBook