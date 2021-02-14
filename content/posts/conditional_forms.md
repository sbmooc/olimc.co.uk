---
title: "Conditional forms with django"
date: 2020-12-23
draft: true
---

I've recently begun some freelancing with a charity to help them out with some development work. Over the past couple of years, I've worked with django a lot, but always in the context of a DRF powered API and a separate front end. This application is a single monolithic application, using django as intended, batteries included.

I was asked to implement a conditional form where certain questions would only be shown depending on the result of a previous question. This sort of thing is made very easy in google forms, where the staff had built and were using a prototype.

I looked around for other's implementations, but most suggested using javascript, or [weren't quite what i was looking for.](https://stackoverflow.com/questions/43001425/django-modelform-with-conditions). I wanted to implement it without javascript, as there's a lot of hidden JS across the application at the moment.

I settled on something similar to the below, it seems to work relatively well - and isn't too difficult to follow.

As a simple demonstration to my implementation, consider this simple conditional flow.

There will be 2 questions in the form:
  - What's your favourite food?
    - Pizza
    - Pasta
If Pizza:
  - What's your favourite topping?
If Pasta:
  - What's your favourite sauce?

We are also not using a db to store anything as the user progresses, and we don't want to rely on state being maintained in the server. So we attach previous answers to the next url. You *really* don't want to use this approach for any sensitive or secure information, as the query params will show up in the browser's history.

Our form will look something like this:

```python
class PizzaForm(Form):
    def __init__(self, *args, **kwargs):
        step = kwargs.pop("step")
        self.persisted_data = kwargs.pop("persisted_data")
        super().__init__(*args, **kwargs)
        self.next_step = None
        self.dyanmic_routing = None
        self.summary = None
        if step:
            self.fields = getattr(self, "step_" + str(step))()
	else:
            self.fields = self.step_0()


    def _post_clean(self):
        if self.is_valid():
            assert self.next_step or self.dynamic_routing
            if not self.next_step:
                self.next_step = self._get_next_step(
                    self.dynamic_routing, self.cleaned_data
                )

        return super()._post_clean()

    @staticmethod
    def _get_next_step(dynamic_routing, data):
        field, routing = dynamic_routing[0], dynamic_routing[1]
        answer = data[field]
        return routing[answer]

    def step_0(self):
        favourite_food = forms.ChoiceField(label="What's your favourite food?", choices=(('Pizza', 'pizza'), ('Pasta', 'pasta')))
        self.dynamic_routing = (("favourite_food", {"pizza": 1, "pasta": 2}))
        return OrderedDict([favourite_food,])

    def step_1(self):
        favourite_topping = forms.ChoiceField(choices=(('Ham', 'ham'), ('Pineapple', 'pineapple'), ('potatos', 'Potatos'))
	self.next_step = 4
        return OrderedDict([favourite_topping,])

    def step_2(self):
        favourite_sauce = forms.ChoiceField(choices=(('Pesto','pesto'), ('Tomato', 'tomato'), ('Cheese', 'cheese'))
	self.next_step = 4
        return OrderedDict([favourite_sauce,])

    def step_3(self):
        self.summary = self.persisted_data
        return
```

And our view will look something like this:
```python
```

There's nothing special that needs to happen in the template, and you can do something like this:
```html
```


This is a pretty robust and relatively simple approach. It works well in situations where you're not passing secure information and where form performance isn't a huge priority.
