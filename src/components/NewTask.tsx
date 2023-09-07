import {useNewTask} from '../provider/NewTaskProvider'
import {Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useFormik} from 'formik'
import {SquarePlus} from '../Icons/SquarePlus'
import {useStore} from '../store'
import {useCreateTask} from '../hooks/useCreateTask'

type FormValues = {
  title?: string
  description?: string
}

export const NewTask = () => {
  const {isOpen, state, onClose} = useNewTask()
  const cards = useStore(store => store.cards)
  const mutate = useCreateTask()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validate: values => {
      const errors: FormValues = {}
      if (!values.title) {
        errors.title = 'Required'
      }
      if (!values.description) {
        errors.description = 'Required'
      }
      const cardTitles = cards.map(card => card.title)
      if (cardTitles.includes(values.title)) {
        errors.title = 'Title already exists'
      }
      return errors
    },
    onSubmit: ({title, description}, {resetForm}) => {
      if (!state) return
      mutate.mutate({title, description, status: state})
      onClose()
      resetForm()
    },
  })

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <SquarePlus state={state} />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add New Task
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="Title"
                              className="block text-sm font-medium leading-6 text-gray-900 text-left"
                            >
                              Title
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  autoComplete="title"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="Title"
                                  onChange={formik.handleChange}
                                  value={formik.values.title}
                                />
                              </div>
                              {formik.errors.title ? (
                                <span className="text-danger text-xs">
                                  {formik.errors.title}
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="about"
                              className="block text-sm font-medium leading-6 text-gray-900 text-left"
                            >
                              Description
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="block w-full rounded-md border-0 pl-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Descripction"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                              />
                              {formik.errors.description ? (
                                <span className="text-danger text-xs">
                                  {formik.errors.description}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-full">
                          <div className="mt-2 flex items-center gap-x-3">
                            <button
                              type="submit"
                              className="rounded-md bg-mantis-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
