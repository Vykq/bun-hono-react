import { createFileRoute } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"


import { useForm } from '@tanstack/react-form'
import { api } from '@/lib/api'

export const Route = createFileRoute('/checkpoints/create')({
  component: CreateCheckpoint,
})

function CreateCheckpoint(){

const form = useForm({
  defaultValues: {
    title: '',
    sampler: '',
    realname: '',
    cfg: 0,
    image: '',
    negativeprompt: '',
    forPremium: false,
    forLogged: false,
  },
  onSubmit: async ({ value }) => {
    // await new Promise(r=> setTimeout(r, 3000))

    const res = await api.checkpoints.$post({ json: value });
    if(!res.ok){
      console.log(value);
      throw new Error("Error server");
    }
    console.log(value);
  },
});


  return <div className="create-checkpoint  max-w-4xl mx-auto py-4 px-4">
    <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}>
      <div className="text-input my-4 flex space-y-2 flex-col">

      <form.Field
        name="title"
        children={(field) => (
          <>
            <Label htmlFor={field.name}>Title</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
              {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
              ) : null}
          </>
        )}
        />
      </div>
      <div className="text-input my-4 flex space-y-2 flex-col">
        <form.Field
        name="sampler"
        children={(field) => (
          <>
            <Label htmlFor={field.name}>Sampler</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
              {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
              ) : null}
          </>
        )}
        />
      </div>
      <div className="text-input my-4 flex space-y-2 flex-col">
        <form.Field
        name="realname"
        children={(field) => (
          <>
            <Label htmlFor={field.name}>Real name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
              {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
              ) : null}
          </>
        )}
        />
      </div>
      <div className="text-input my-4 flex space-y-2 flex-col">
        <form.Field
        name="cfg"
        children={(field) => (
          <>
            <Label htmlFor={field.name}>CFG</Label>
            <Input
              type="number"
              min="1"
              max="10"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
            />
              {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
              ) : null}
          </>
        )}
        />
      </div>
      <div className="input-text my-4 flex space-y-2 flex-col">
            <form.Field
        name="image"
        children={(field) => (
          <>
            <Label htmlFor={field.name}>Image</Label>
            <Input
              type="file"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
              {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
              ) : null}
          </>
        )}
        />
      </div>
      <div className="input-text my-4 flex space-y-2 flex-col">
            <form.Field
        name="negativeprompt"
        children={(field) => (
          <>
            <Label htmlFor={field.name}>Negative prompt</Label>
            <Textarea
              className='resize-none'
              id={field.name}
              name={field.name}
              value={String(field.state.value)}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
              {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
              ) : null}
          </>
        )}
        />
      </div>

  
          <div className="mt-6 mb-4 flex-col flex space-y-2">
          <div className="checkbox items-top flex space-x-2">
          <form.Field
        name="forPremium"
        children={(field) => (
          <>
            <input
              type='checkbox'
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Boolean(e.target.value))}
            />
            <Label htmlFor={field.name}>Premium</Label>
            
              {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
              ) : null}
          </>
        )}
        />
            </div>
            <div className="checkbox items-top flex space-x-2">
            <form.Field
        name="forLogged"
        children={(field) => (
          <>
          <input
              type='checkbox'
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Boolean(e.target.value))}
            />
            <Label htmlFor={field.name}>Logged in</Label>
            
              {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
              ) : null}
          </>
        )}
        />
            </div>
        </div>

        <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Creating' : 'Create new'}
              </Button>
            )}
          />
      </form>
  </div>
}