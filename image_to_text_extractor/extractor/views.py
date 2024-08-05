# extractor/views.py
import requests
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pytesseract
from PIL import Image
import base64
from io import BytesIO

@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        if 'image' in request.FILES:
            image = request.FILES['image']
            img = Image.open(image)
            extracted_text = pytesseract.image_to_string(img)
            return JsonResponse({'text': extracted_text})

        elif 'clipboard_text' in request.POST:
            clipboard_text = request.POST['clipboard_text']
            if clipboard_text.startswith('http'):
                response = requests.get(clipboard_text)
                img = Image.open(BytesIO(response.content))
            else:
                img = Image.open(BytesIO(base64.b64decode(clipboard_text.split(',')[1])))
            extracted_text = pytesseract.image_to_string(img)
            return JsonResponse({'text': extracted_text})

    return render(request, 'extractor/upload.html')
