from django.shortcuts import render


def lobby_view(request):
    context = {
        'title': 'Lobby'
    }

    return render(request, 'lobby.html', context)


def room(request):
    context = {
        'title': 'Room'
    }
    
    return render(request, 'room.html', context)
