import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useForm } from '@tanstack/react-form'


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"


export const Route = createFileRoute('/checkpoints/$checkpointId')({
  component: PostComponent,
})


async function getCurrentCheckpoint(checkpointId: number) {
  await new Promise((r) => setTimeout(r, 1000));
  const res = await api.checkpoints[checkpointId].$get();
  if (!res.ok) {
    throw new Error('Server error');
  }
  const data = await res.json();
  return data;
}

function PostComponent() {
  const { checkpointId } = Route.useParams();
  const parsedCheckpointId = parseInt(checkpointId, 10);

  const { data, error, isLoading } = useQuery({
    queryKey: ['get-current-checkpoint', parsedCheckpointId],
    queryFn: () => getCurrentCheckpoint(parsedCheckpointId),
  });

  const form = useForm({
    defaultValues: {
      title: data?.title ? data.title : '',
      sampler: data?.sampler ? data.sampler : '',
      realname: data?.realname ? data.realname : '',
      cfg: data?.cfg ? data.cfg : 2,
      image: data?.image ? data.image : '',
      negativeprompt: data?.negativeprompt ? data.negativeprompt : '',
      forPremium: data?.forPremium ? data.forPremium : false,
      forLogged: data?.forLogged ? data.forLogged : false,
    },
    onSubmit: async ({ value }) => {
      await new Promise(r=> setTimeout(r, 3000))
  
      // const res = await api.checkpoints.$post({ json: value });
      // if(!res.ok){
      //   console.log(value);
      //   throw new Error("Error server");
      // }
      console.log(value);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;



  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }}>
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center">
            <img src={data?.image} alt={data?.title} className="w-full h-auto rounded" />
          </div>
          <div className="flex flex-col space-y-4">
            <div>
            <form.Field
              name="title"
              children={(field) => (
                <>
              <Label>Title</Label>
              <Input
                type="text"
                defaultValue={data?.title}
              />
              {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
              ) : null}
          </>
        )}
        />
            </div>
            <div>
              <Label>For Premium</Label>
              <input
                type="checkbox"
                defaultChecked={data?.forPremium}
              />
            </div>
            <div>
              <Label>For Logged</Label>
              <input
                type="checkbox"
                defaultChecked={data?.forLogged}
              />
            </div>
            <div>
            <form.Field
              name="title"
              children={(field) => (
                <>
              <Label>Sampler</Label>
              <Input
                type="text"
                defaultValue={data?.sampler}
              />
            {field.state.meta.touchedErrors ? (
            <em>{field.state.meta.touchedErrors}</em>
                    ) : null}
                </>
              )}
              />
            </div>
            <div>
              <Label>Real Name</Label>
              <Input
                type="text"
                defaultValue={data?.realname}
              />
            </div>
            <div>
              <Label>CFG</Label>
              <Input
                min="1"
                max="10"
                type="number"
                defaultValue={data?.cfg}
              />
            </div>
            <div>
              <Label>Negative Prompt</Label>
              <Textarea
                defaultValue={data?.negativeprompt}
              />
            </div>
            <div className="flex justify-end">
            <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Saving' : 'Save'}
              </Button>
            )}
          />
            </div>
          </div>
        </div>
      </div>
      </form>
  );
}
