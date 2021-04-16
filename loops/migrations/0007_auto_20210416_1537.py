# Generated by Django 3.2 on 2021-04-16 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loops', '0006_alter_loop_loop_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='loop',
            name='loop_data',
        ),
        migrations.AddField(
            model_name='loop',
            name='bpm',
            field=models.IntegerField(default=120),
        ),
        migrations.AddField(
            model_name='loop',
            name='steps',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='loop',
            name='synth',
            field=models.CharField(default='fmSynth', max_length=50),
        ),
    ]
