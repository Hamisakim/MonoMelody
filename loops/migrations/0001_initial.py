# Generated by Django 3.2 on 2021-04-19 10:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('genres', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Loop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, null=True, unique=True)),
                ('steps', models.CharField(max_length=2000000)),
                ('bpm', models.IntegerField(default=120)),
                ('synth', models.CharField(default='fmSynth', max_length=50)),
                ('key', models.CharField(default='c', max_length=10)),
                ('scale', models.CharField(default='major', max_length=50)),
                ('effect', models.CharField(default='freeverb', max_length=50)),
                ('genres', models.ManyToManyField(blank=True, related_name='loops', to='genres.Genre')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loops_created', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
