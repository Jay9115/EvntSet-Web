def Simple_fun(x) :
     return x + 1

Result = Simple_fun(1)


def function_with_args(pos_arg, keyword=None, *args, **keyword):
    print(f'Positional argument: {pos_arg}')
    print(f'Keyword argument: {keyword}')
    print('Variable-length arguments:', args)
    print('Keyword arguments:', keyword)

function_with_args(1, 'test', 2, 3, key1='value1', key2='value2')

def multiple_values():
    return 1, 2, 3

result = multiple_values()

anonymous_function = lambda x: x * 2

result = anonymous_function(5)

def outer_function(x):
    def inner_function(y):
        return y + 1
    return inner_function(x) + x

result = outer_function(5)

def decorator_function(original_function):
    def wrapper_function():
        print('Wrapper executed before {}'.format(original_function.__name__))
        return original_function()
    return wrapper_function

@decorator_function
def display():
    return 'Display function executed'


result = display()


def recursive_function(n):
    if n <= 1:
        return n
    else:
        return n + recursive_function(n - 1)

result = recursive_function(5) 

def function_taking_another(func):
    return func(5)

def square(x):
    return x * x

result = function_taking_another(square)

def documented_function():
    """This function does nothing but serves as an example of a docstring."""
    pass


doc = documented_function.__doc__  

def typed_function(x: int) -> int:
    return x * 2


result = typed_function(5)